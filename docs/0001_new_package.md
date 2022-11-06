# README

创建一个示例

# npm config

npm config ls

```
Debugger attached.
; node bin location = /home/zengjf/bin/node/bin/node
; node version = v16.17.0
; npm local prefix = /home/zengjf/zengjf/github/MDPlantLib
; npm version = 8.15.0
; cwd = /home/zengjf/zengjf/github/MDPlantLib
; HOME = /home/zengjf
; Run `npm config ls -l` to show all defaults.
Waiting for the debugger to disconnect...
```

# init package

npm init

```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (mdplantlib) 
version: (1.0.0) 0.0.1
description: lib for vscode extension MDPlant
entry point: (index.js) 
test command: echo "test"
git repository: https://github.com/ZengjfOS/MDPlantLib
keywords: 
author: zengjf
license: (ISC) MIT
About to write to /home/zengjf/zengjf/github/MDPlantLib/package.json:

{
  "name": "mdplantlib",
  "version": "0.0.1",
  "description": "lib for vscode extension MDPlant",
  "main": "index.js",
  "scripts": {
    "test": "echo \"test\""
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ZengjfOS/MDPlantLib.git"
  },
  "author": "zengjf",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/ZengjfOS/MDPlantLib/issues"
  },
  "homepage": "https://github.com/ZengjfOS/MDPlantLib#readme"
}


Is this OK? (yes) yes
npm notice 
npm notice New minor version of npm available! 8.15.0 -> 8.19.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.19.2
npm notice Run npm install -g npm@8.19.2 to update!
npm notice 
```

# run

node index.js

# npm install

* npm install -g .
  * ~/bin/node/lib/node_modules/mdplantlib
* npm uninstall -g mdplantlib

# run test

* npm run test

# npm publish

npm adduser

```
npm WARN adduser `adduser` will be split into `login` and `register` in a future version. `adduser` will become an alias of `register`. `login` (currently an alias) will become its own command.
npm notice Log in on https://registry.npmjs.org/
Username: zengjf
Password: 
Email: (this IS public) zengjf42@163.com
npm notice Please check your email for a one-time password (OTP)
Enter one-time password: 59437714
Logged in as zengjf on https://registry.npmjs.org/.
```

* npm pack
  * 可以提前看一下打包是否可能存在问题
* npm publish

```
npm notice 
npm notice 📦  mdplantlib@0.0.1
npm notice === Tarball Contents === 
npm notice 108B  Makefile                
npm notice 122B  README.md               
npm notice 2.0kB docs/0001_new_package.md
npm notice 225B  index.js                
npm notice 86B   lib/indent.js           
npm notice 475B  package.json            
npm notice === Tarball Details === 
npm notice name:          mdplantlib                              
npm notice version:       0.0.1                                   
npm notice filename:      mdplantlib-0.0.1.tgz                    
npm notice package size:  1.5 kB                                  
npm notice unpacked size: 3.0 kB                                  
npm notice shasum:        d1e772e4cb9203a1f1a0ccccc1f2108368521789
npm notice integrity:     sha512-A2HMqHPVFkJ05[...]Rlej8s98dZcGQ==
npm notice total files:   6                                       
npm notice 
npm notice Publishing to https://registry.npmjs.org/
+ mdplantlib@0.0.1
```
