<div align="center">
    <h1>🧪 Single-tenant architecture proposal (with single-tenant codebase)</h1>
    <strong>One white-label infrastructure (a single software runtime serves a single customer) and one renderer codebase per brand</strong>
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
pnpm start:single-tenant-separate-renderer
```

<br>

## 🏗 Architecture

![Component diagram for single-tenant infrastructure with single-tenant codebase](https://user-images.githubusercontent.com/10498826/184859689-f6f72f28-420b-4044-a6c1-67aba33fe530.png)

<br>

## 👨‍🏫 Assessment

### Pros

- The most flexibility to introduce specificities for a given brand: all white-label application can be consumed and composed freely within each renderer
- The structure enables exit-door from the Next.js runtime (the application is isolated from the renderer)

### Cons

- Setup complexity: each new integration must have a renderer (the renderer is duplicated for each brand -> N renderers for N brands)
- Maintenance complexity: High risk to let brand diverge over time especially if no automation is done. Recreating the same page structure, setuping the white-label application and the wrapper skeleton, ... are as many factors as to keep in mind while creating or updating an existing integration
