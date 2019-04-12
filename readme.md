# Uses NANOGEN module.

Note: `npm install` to re-hydrate node_modules

Setup for Visual Studio Code:

tasks.json
```
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "build",
            "problemMatcher": []
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