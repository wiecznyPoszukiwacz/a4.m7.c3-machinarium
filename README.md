# a4.m7.c3-machinarium

## Overview
Machinarium is a small experimental environment written in TypeScript. It models a collection of machines that share electricity and temperature subsystems. A WebSocket server exposes the running simulation so an operator can inspect and modify machine state in real time.

## Building
Install dependencies and compile the TypeScript sources using the included `tsconfig.json`:

```bash
npm install
npx tsc
```

The compiled JavaScript files will be generated in the `build/` directory.

## Starting the server
After compiling, launch the WebSocket server with Node:

```bash
node build/index.mjs
```

The server listens on `ws://localhost:8090`. You can connect using any WebSocket client, for example:

```bash
npx wscat -c ws://localhost:8090
```

## Operator commands
Once connected, the operator console accepts several commands:

- `auth` – authenticate the operator session.
- `ls` – list available machines and their status.
- `elman` – show an electricity report.
- `set <machine> <key> <value>` – change a machine configuration value.
- `get <machine> <key>` – read a machine configuration value.
- `inspect <machine>` – print the machine report.

