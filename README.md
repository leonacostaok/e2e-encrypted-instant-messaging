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
Make sure all the environment variables are set up as per the `env.example` file.

```bash
# install project dependencies
$ cd yarn install
$ cd ./client & yarn install
# generate migration for local environment
$ cd ./server & yarn prisma:generate
# run migrations in local environment
$ cd ./server & yarn prisma:migrate
# run backend service
$ ts-node ./server/app.ts
# run the client
$ cd ./client & yarn start
```

## Troubleshooting

If you have any questions, send them along with a hi to leon@dandelionlabs.io.
