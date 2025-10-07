# Debugging Configurator in VSCode on Windows

It is possible to debug the Betaflight App with Visual Studio Code which is a more friendly environment than DevTools.
This procedure has been tested only for Windows 10.

Make sure you use Configurator 10.8 + after this PR is merged:
https://github.com/betaflight/betaflight-configurator/pull/2607

In VSCode, create a launch.json file (in .vscode folder) with this configuration:
<br/>

```JSON
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Betaflight",
            "type": "nwjs",
            "request": "launch",
            "runtimeExecutable": "${workspaceRoot}/debug/betaflight-configurator/win64/betaflight-configurator.exe",
            "runtimeArgs": [
                "${workspaceRoot}",
                "--remote-debugging-port=9222"
            ],
            "port": 9222,
            "nwjsVersion": "any",
            "webRoot":"${workspaceRoot}/src",
            "preLaunchTask": "build and copy package.json",
            "postDebugTask": "delete package.json",
        },
        {
            "type": "nwjs",
            "request": "attach",
            "name": "Attach to Betaflight",
            "port": 9222,
            "webRoot":"${workspaceRoot}/src/js",
            "verbose":true,
            "reloadAfterAttached": true
        }
    ]
}
```

<br/>
Create tasks.json file in .vscode folder with the following content:
<br/>

```JSON
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "delete package.json",
            "type": "shell",
            "command": "rm .\\src\\package.json",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "showReuseMessage": false
            }
        },
        {
            "label": "build debug no start",
            "type": "shell",
            "command": "yarn gulp debug-no-start; copy -Path package.json -Destination .\\src\\package.json -Force",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "showReuseMessage": false
            }
        },
        {
            "label": "copy package.json",
            "type": "shell",
            "command": "copy -Path package.json -Destination .\\src\\package.json -Force",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "showReuseMessage": false
            }
        },
        {
            "label": "build and copy package.json",
            "dependsOn": [
                "build debug no start",
                "copy package.json"
            ],
            "presentation": {
                "showReuseMessage": false
            }
        }
    ]
}
```

<br/>
Press F5 in Visual Studio Code, enjoy debugging right in your code.

Files needs a little adjustment

## Debugging Configurator in VSCode on Linux

1. In VSCode be sure to install Debugger for NWjs
2. In your project create in the .vscode folder launch.json and tasks.json

Contents of launch.json

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Betaflight",
            "type": "nwjs",
            "request": "launch",
            "runtimeExecutable": "${workspaceRoot}/debug/betaflight-configurator/linux64/betaflight-configurator",
            "runtimeArgs": [
                "${workspaceRoot}",
                "--remote-debugging-port=9222"
            ],
            "port": 9222,
            "nwjsVersion": "any",
            "webRoot": "${workspaceRoot}/src",
            "preLaunchTask": "build and copy package.json",
            "postDebugTask": "delete package.json",
        },
        {
            "type": "nwjs",
            "request": "attach",
            "name": "Attach to Betaflight",
            "port": 9222,
            "webRoot": "${workspaceRoot}/src/js",
            "verbose": true,
            "reloadAfterAttached": true
        }
    ]
}
```

Contents of `tasks.json`

```
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "delete package.json",
            "type": "shell",
            "command": "rm ./src/package.json",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "showReuseMessage": false
            }
        },
        {
            "label": "build debug no start",
            "type": "shell",
            "command": "yarn gulp debug-no-start; cp package.json ./src/package.json",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "showReuseMessage": false
            }
        },
        {
            "label": "copy package.json",
            "type": "shell",
            "command": "cp package.json ./src/package.json",
            "problemMatcher": [],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                "showReuseMessage": false
            }
        },
        {
            "label": "build and copy package.json",
            "dependsOn": [
                "build debug no start",
                "copy package.json"
            ],
            "presentation": {
                "showReuseMessage": false
            }
        }
    ]
}
```
