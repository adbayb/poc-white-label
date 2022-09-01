<div align="center">
    <h1>🧪 Client-side integration</h1>
    <strong>White-label integration supporting client-side rendering</strong>
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
pnpm start:client-side-integration
```

<br>

## 🏗 Architecture

Chosen technology: [Module federation](https://module-federation.github.io/) (run-time dependency manager) and [single-spa](https://single-spa.js.org/) (client-side micro-frontend orchestrator and router framework).

![Component diagram](https://user-images.githubusercontent.com/10498826/187178593-9dba0ea5-9f24-40ce-a846-b85ef60e376d.png)

**On a side note**, the single-spa usage can be overengineered for our use case. Indeed, the module federation could be used alone to orchestrate shell dependencies (micro frontends) since we don't have to manage multiple routes. However, to anticipate more complex routing, we took the initiative to showcase its usage.
