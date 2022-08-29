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

![Component diagram for single-tenant infrastructure with multi-tenant codebase](https://user-images.githubusercontent.com/10498826/187184597-d326509e-48e7-429b-b718-7139114efb11.png)

<br>

## 👨‍🏫 Assessment

### Pros

- One single source of truth (the renderer) for all brands to manage the core logic, the routing, BFF. _It's important to keep in mind that the single renderer is only code-side: there'll be one renderer built per brand (single-tenant architecture)_
- Clear seperation of concerns between the shared vs configurable logic with a shared contract to manage each brand specificities
- Consequently, ease the setup and maintenance

### Cons

- Any new specific brand configuration has to be added to the shared configuration contract and managed even for a non-impacted brand (which could be mitigated with a default value strategy)
