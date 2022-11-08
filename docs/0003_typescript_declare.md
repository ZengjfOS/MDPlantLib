# typescript declare

解决vscode插件开发没有函数提示问题

# 参考文档

* [Modules .d.ts](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)

# 处理流程

* `sudo npm install typescript -g`
* `tsc --allowJs --declaration index.js`
  * 虽然会报错，但是还是会正确的生成`.d.ts文件`
