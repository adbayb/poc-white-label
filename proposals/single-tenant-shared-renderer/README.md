<div align="center">
    <h1>🧪 Single-tenant architecture proposal (with multi-tenant codebase)</h1>
    <strong>One white-label infrastructure per brand (a single software runtime serves a single customer) with a single shared renderer codebase</strong>
</div>
<br>
<br>

## 🚀 Quickstart

1️⃣ Install by running:

```bash
pnpm i
```

2️⃣ Try it by running:

```bash
# For the `brand-blue` application:
pnpm start:single-tenant-shared-renderer:brand-blue
# For the `brand-red` application:
pnpm start:single-tenant-shared-renderer:brand-red
```

<br>

## 🏗 Architecture

![Component diagram for single-tenant infrastructure with multi-tenant codebase](https://user-images.githubusercontent.com/10498826/184893195-b53da673-9aaf-4235-b0ea-811381d788ac.png)

<br>

## 👨‍🏫 Assessment

### Pros

- One single source of truth (the renderer) for all brands to manage the core logic, the routing, BFF. _It's important to keep in mind that the single renderer is only code-side: there'll be one renderer built per brand (single-tenant architecture)_
- Configuration contract to manage the brand specificities via a React component (`<Shell {...props} />`)
- Consequently, ease the white-label and brand maintenance

### Cons

- Less flexibility on the unknown: the shell component scopes the brand configuration possibility
