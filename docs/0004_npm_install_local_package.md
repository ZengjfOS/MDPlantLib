# npm install local package

MDPlant直接使用MDPlantLib调试

# steps

* cd MDPlant
* npm install ../MDPlantLib
  * ls -al node_modules/mdplantlib
    ```
    lrwxrwxrwx 1 zengjf zengjf 16 11月 10 22:13 node_modules/mdplantlib -> ../../MDPlantLib
    ```
* git diff package.json
  ```diff
  diff --git a/package.json b/package.json
  index 520a83b..72a9d76 100644
  --- a/package.json
  +++ b/package.json
  @@ -146,6 +146,7 @@
          },
          "dependencies": {
                  "axios": "^0.24.0",
  -               "fs-extra": "^10.1.0"
  +               "fs-extra": "^10.1.0",
  +               "mdplantlib": "file:../MDPlantLib"
          }
   }
  ```
