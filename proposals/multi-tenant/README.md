<div align="center">
    <h1>🧪 Multi-tenant architecture proposal</h1>
    <strong>One white-label infrastructure shared across brands (a single software runtime serves multiple customers)</strong>
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
pnpm start:multi-tenant
```

<br>

## 🏗 Architecture

### Component diagram

![Component diagram for multi-tenant proposal](https://user-images.githubusercontent.com/10498826/186714317-7af1dd1c-e677-4cad-ae2c-308ad11de886.png)

In contrast to single-tenant solutions, a new component is added to the integration system: **the global white-label registry**. Its responsibility is to discover and serve critical white-label resources (by critical, we mean all configuration and resources (URL, metadata, static files, ...) needed by each brand shell to display the white-label).

### Sequence diagram

```mermaid
sequenceDiagram
    autonumber
    participant B as Brand
    participant S as Shell (one per brand)
    participant WReg as Registry [CDN]
    participant WRen as White-label - Renderer [Server]
    participant WApp as White-label - Application [Component]
    participant WBff as White-label - BFF [Server]
    participant D as Dowstream services
    B->>+S: route(RequestParameters: { id: 'white-label-id', brandID: 'brand-blue' | 'brand-red', env: 'prod' | 'staging', ... })
    # The route operation should be defined technically depending on the performance budget (SEO constraint, ...): build-time (package consumption) / run-time (dynamic ESM loading) or server-side composition (reverse proxy, server side includes, ...)
    # Request parameters could be provided via environment variables
    S->>+WReg: requestMetadata(requestParameters)
    WReg-->>-S: Result<Metadata: { id, version, apiLinks: { renderer, bff, ... },  renderingMode: 'server' | 'client', ... }>
    S->>+WReg: requestStaticFiles(requestParameters)
    Note right of WReg: White-label static files generated at build-time (from the renderer and application)
    WReg-->>-S: append(staticFiles)
    opt renderingMode is 'server'
        S->>+WRen: renderPageFragment(id, brandID)
        WRen->>+WBff: getServerSideProps(brandID)
        loop For as many services as needed
            WBff->>+D: requestData(...)
            D-->>-WBff: Result<DataFromAGivenService>
        end
        WBff-->>-WRen: Result<ServerSideProps>
        WRen->>+WApp: renderToString(serverSideProps)
        WApp-->>-WRen: Result<PageFragment>
        WRen-->>-S: append(pageFragment)
    end
    S-->>-B: Result<Page>
    S->>+WRen: mount(id, brandID)
    WRen->>+WApp: render(brandID)
    WApp->>+WBff: requestData(brandID)
    loop For as many services as needed
        WBff->>+D: requestData(...)
        D-->>-WBff: Result<DataFromAGivenService>
    end
    WBff-->>-WApp: Result<ConsolidatedData>
    WApp-->>-WRen: Result<DOM>
    WRen-->>-S: Result<Mounted>
```

<br>

## 👨‍🏫 Assessment

### Pros

- Single platform: one single source of truth to manage the white-label integration
- Consequently (1/2), reduce the operational cost by sharing resources across clients
- Consequently (2/2), ease the setup, maintainance, monitoring and release across clients

### Cons

- Less flexibility to do specific customization for a given brand
- Sharing resources between tenants would mean having a solid understanding from the beginning about what is specific and what is not (for example, might not be suited for a MVP)
- Tenant isolation (data) can be challenging to manage
