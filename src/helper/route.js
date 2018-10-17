const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const mime = require('../helper/mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

const tlpPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tlpPath, 'utf8');
const template = Handlebars.compile(source.toString())

module.exports = async (req, res, filePath, conf) => {
  try {
    // 读取文件信息
    const stats = await stat(filePath);
    if (stats.isFile()) {
      // 文件
      res.setHeader('Content-Type', mime(filePath))
      if(isFresh(stats, req, res)){
        // 缓存可用， 新鲜
        res.statusCode = 304
        res.end()
        return
      }
      // 可读流
      let rs;
      const {code, start, end} = range(stats.size, req, res)
      if(code === 200){
        res.statusCode = 200
        rs = fs.createReadStream(filePath)
      }else{
        res.statusCode = 206
        rs = fs.createReadStream(filePath, {start, end})
      }
      if(filePath.match(conf.compress)){
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      // 目录
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(conf.root, filePath)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => ({
          file,
          icon: mime(file)
        }))
      }
      res.end(template(data))
    }
  } catch (ex) {
    console.error(ex);
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file! \n ${ex.toString()}`)
  }
}
