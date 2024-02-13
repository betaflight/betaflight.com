# betaflight.com - Website

![Betaflight](/static/img/bf_logo.png)

[![Join us on Discord!](https://img.shields.io/discord/868013470023548938)](https://discord.gg/n4E6ak4u3c)

## Project Description

This platform serves as a central hub for everything related to Betaflight, a popular open-source flight controller software used in FPV (First Person View) drones. This project provides users with documentation, development guidelines, downloads, build statistics, relations with sponsors, and blog updates. The website was built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator. Our goal is to offer a user-friendly platform where users can easily access accurate and helpful resources, contributing to the overall improvement of the Betaflight community.

## Table of Contents

1. [Installation and Setup](#installation-and-setup)
2. [Usage Instructions](#usage-instructions)
3. [Troubleshooting](#troubleshooting)
4. [Build](#build)
5. [Deployment](#deployment)
6. [ESLint Prettier](#eslint-prettier)
7. [Contributing Guidelines](#contributing-guidelines)

## Installation and Setup

This project primarily consists of a documentation website built using Docusaurus. To run the project locally, follow these steps on a Linux machine:

Fork the repository. Then, clone the forked GitHub repository to your local machine:

```bash
git clone https://github.com/<yourusername>/betaflight.com.git
```

Navigate to the project directory:

```bash
cd betaflight.com
```

Install dependencies using npm:

```bash
$ npm i
```

If npm is not installed and you are using Linux, you can typically install npm using your distribution's package manager. For example, on Debian or Ubuntu-based systems, you can use apt:

```bash
sudo apt update
sudo apt install npm
```

Copy the .env.example file to .env and configure it according to your setup.

```bash
$ cp .env.example .env
```

The default is for a standard development environment:

```bash
URL=http://localhost:3000
BASE_PATH=/
ORG=betaflight
```

## Start the Local Development server

```bash
$ npm start
```

This command starts a local development server and opens up a browser window at http://localhost:3000. Most changes are reflected live without having to restart the server.

## Usage Instructions

Once Betaflight is set up, you can access the website locally through your browser. Users can easily navigate through the various sections of the platform to find the information they need. The Wiki section provides detailed documentation on Betaflight-related topics. The Development section is primarily for developers on how to contribute. The Downloads section offers access to essential resources such as Betaflight Configurator, Firmware, Lua Tx Scripts, BlackBox Log Viewer, and more. Additionally, users can check Build Statistics, find Betaflight Sponsors, and stay up-to-date with the latest developments and announcements by checking the Blog section.

## Troubleshooting

If you encounter an issue while running npm start, especially related to syntax errors, it might be due to an incompatible version of Node.js. Follow these steps to resolve the issue:

Remove the current version of Node.js:

```bash
sudo apt remove nodejs
```

Install nvm (Node Version Manager) if you haven't already:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Close and reopen your terminal to start using nvm, or run:

```bash
source ~/.bashrc
```

Install the latest LTS version of Node.js:

```bash
nvm install --lts
```

Activate the LTS version:

```bash
nvm use --lts
```

Try starting the application again by running:

```bash
npm run
```

## Build

To build the website for deployment, use the following command:

```bash
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
$ USE_SSH=true npm run deploy
```

Not using SSH:

```bash
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## ESLint Prettier

We use eslint and prettier for code formatting.

Husky is configured as a pre-commit hook to run both on commit, make sure it is setup correct and it runns before you commit your code.

## Contributing Guidelines

Please refer to the [CONTRIBUTING.md](./CONTRIBUTION.md) file for detailed guidelines on how to contribute to Betaflight.
