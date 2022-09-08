# Uses NANOGEN module

## Setup your environment variables
You will need to set environment variables for your github username and token for the build script to complete successfully. How to generate a github (personal access token [https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token]).


.\src\js\github.js
```
const axiosConfig = {
    baseURL: 'https://api.github.com',
    auth: {
        username: process.env.GITHUB_LOGIN,
        password: process.env.GITHUB_TOKEN
    }
};
```
*Note*: Don't forget to run `yarn` (in the repository directory) to re-hydrate node\_modules

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

The build scripts log informational and error messages out to the bash console. An alternative to CTL-SHIFT-B is to run the build script from a bash console. 
From a vs code bash terminal: $ bash ./scripts/build.sh


```

This will put the website into ./public folder. Using the Go Live (Live Server by Ritwick Dey [https://github.com/ritwickdey/vscode-live-server]) module plugin for Visual Studio Code you can go live this folder:

settings.json:
```
{
    "liveServer.settings.root": "/public/"
}
```
