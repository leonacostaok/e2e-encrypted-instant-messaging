# End-to-end Encrypted Instant Messaging platform

This repository contains a client & server example that provides end-to-end encrypted instant messaging capabilities.

The code repository is split in 2, client & server. To run follow the instructions ahead in this document.

## Table of Contents

- [Getting Started](#getting-started)
    - [Requirements](#requirements)
    - [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Requirements

You need node.js (16.x) and yarn installed to run it locally.
Make sure all the environment variables are set up as per the `env.example` file in each repo separately (server / client).

#### Server deployment
```bash
# install project dependencies
$ cd ./server & yarn install
# generate migration for local environment
$ yarn prisma:generate
# run migrations in local environment
$ yarn prisma:migrate
# run backend service
$ yarn start
```

#### Client deployment
```bash
# install project dependencies
$ cd ./client & yarn install
# run the client
$ yarn start
```

## Troubleshooting

If you have any questions, send them along with a hi to [leon@dandelionlabs.io](mailto:leon@dandelionlabs.io).
