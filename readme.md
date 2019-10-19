# Uses NANOGEN module

Note: Don't forget to run `yarn` (in the repository directory) to re-hydrate node\_modules

Setup for Visual Studio Code (allows for CTRL-SHIFT-B to trigger immediate build):

tasks.json
```
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build site",
            "type": "shell",
            "script": "bash",
            "args": [
                "-c",
                "./scripts/build.sh"
            ],
            "problemMatcher": [
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```

This will put the website into ./public folder. Using the Go Live (Live Server by Ritwick Dey [https://github.com/ritwickdey/vscode-live-server]) module plugin for Visual Studio Code you can go live this folder:

settings.json:
```
{
    "liveServer.settings.root": "/public/"
}
```
