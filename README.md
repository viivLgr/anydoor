# viiv-anydoor
Tiny NodeJS Static Web Server(静态资源服务器)

## 学习资源

> `.gitignore`
1. 匹配模式前`/`代表项目根目录
2. 匹配模式最后加`/`代表是目录
3. 匹配模式前加`!`代表取反
4. `*` 代表任意个字符
5. `？` 代表任意一个字符
6. `**` 匹配多级目录

> `.npmignore`
> `.editorconfig`

## 安装

```shell
npm i -g viiv-anydoor
```

## 使用方法

```shell
viiv-anydoor   # 把当前文件夹作为静态资源服务器根目录

viiv-anydoor -p 8080   # 设置端口号为 8080

viiv-anydoor -h localhost  # 设置 host 为 localhost

viiv-anydoor -d /usr # 设置根目录为 /usr
```
