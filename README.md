# Sawamura MD3 Service Express

![license](https://img.shields.io/badge/License-MIT-green.svg)
![version](https://img.shields.io/badge/version-0.0.1%20alpha-brightgreen.svg)
![state](https://img.shields.io/badge/state-ongoing-blue.svg)
![test](https://img.shields.io/badge/bug-crit-red.svg)

#### Table of Contents

- [About](#about)
- [Development](#development)

  - [Local installation](#local-installation)
  - [Docker](#docker)

- [Support](#support)
- [License](#license)

## About

This repository is intended for learning and practicing coding. However, please note that this application may contain bugs, and I advise against using it for commercial or personal purposes, as it has not been secured and tested.

The project utilizes a web UI from [sawamura-client-vuetify](https://github.com/akiratatsuhisa/sawamura-client-vuetify).
<br/>
And, a web API from [sawamura-server-nestjs](https://github.com/akiratatsuhisa/sawamura-server-nestjs).

This project is a web service extended from the library [@material/material-color-utilities](https://www.npmjs.com/package/@material/material-color-utilities).

## Development

For installation instructions, please use the following ways.

- [Local installation](#local-installation)
- [Docker](#docker)

## Local installation

### Prerequisites

**Node.js (v20 or higher)**

See the [official Node.js installation documentation](https://nodejs.org/).

### Installation

To install the application, clone the repository and install the required dependencies:

```bash
$ git clone https://github.com/akiratatsuhisa/sawamura-md3-service-express.git
```

Install Dependencies for server app, open new terminal.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Docker

### Prerequisites

**Docker (v20 or higher)**

Please see the [official Docker installation documentation](https://docs.docker.com/get-docker/) for installation instructions.

### Installation

To install the application using Docker, clone the repository and create an .env file with the same contents as for [Local Installation](#local-installation).

### Running

To run the application in a Docker container, use the following commands:

```bash
# Dockerfile hasn't been create
```

## License

This application is released under the [MIT license](LICENSE).
