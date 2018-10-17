const path = require('path')

const mimeTypes = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockware-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wmv': 'audio/x-wmv',
  'xml': 'text/xml'
}

module.exports = (filePath) => {
  let ext = path.extname(filePath)
    .split('.')  // jquery.min.js
    .pop()  // 删除并返回数组的最后一个元素
    .toLowerCase()

  if(!ext){
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']
}
