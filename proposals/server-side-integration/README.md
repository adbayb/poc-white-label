<div align="center">
    <h1>🧪 Server-side integration</h1>
    <strong>White-label integration supporting server-side rendering</strong>
</div>
<br>
<br>

## 🚀 Quickstart

1️⃣ Install by running:

```bash
pnpm i
```

2️⃣ Try it by running from the monorepo root folder:

```bash
# For the `brand-blue` application:
pnpm start:server-side-integration:brand-blue
# For the `brand-red` application:
pnpm start:server-side-integration:brand-red
```

<br>

## 🏗 Architecture

Chosen technology: [Next.js](https://nextjs.org/) (server-side React framework).

![Component diagram](https://user-images.githubusercontent.com/10498826/186856180-01714fc8-90fe-4003-a18f-388cbf4a1ad4.png)

<br>

## 🚧 Other alternatives

While iterating on this solution, several options have been explored (including single-tenant vs multi-tenant solutions and pros/cons for each one).
You can find all the server-side preliminary work inside [this branch](https://github.com/adbayb/poc-white-label/tree/server-side-alternatives).
