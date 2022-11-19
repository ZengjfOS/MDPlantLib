# console log

将终端log保存到文件

# 参考文档

* [Configure Node.js to log to a file instead of the console](https://stackoverflow.com/questions/8393636/configure-node-js-to-log-to-a-file-instead-of-the-console/33898010#33898010)

# 使用参考

```
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/../output/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

// console.log(__dirname + '/../output/debug.log')

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    // log_stdout.write(util.format(d) + '\n');
};
```
