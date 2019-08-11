# Uses NANOGEN module.

Note: `npm install` to re-hydrate node\_modules

Setup for Visual Studio Code (allows for CTRL-SHIFT-B to trigger immediate build):

tasks.json
```
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "build",
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

This will put the website into ./public folder. Using the Go Live (Live Server by Ritwick Dey) module plugin for Visual Studio Code you can go live this folder:

settings.json:
```
{
    "liveServer.settings.root": "/public/"
}
```
