<div align="center">
    <h1>🧪 Multi-tenant architecture proposal</h1>
    <strong>One white-label infrastructure shared across tenants (a single software runtime serves multiple customers)</strong>
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

![Component diagram for multi-tenant proposal](https://user-images.githubusercontent.com/10498826/184859944-e36566a0-c22f-4cf1-92dc-124c00cf7f41.png)

If we compare with single-tenant solutions, a new component is added to the integration system: the global white-label registry. Its responsibility is to discover and serve critical white-label resources (by critical, we mean all resources (URL, metadata, static files) needed by each tenant shell to display the white-label.

### Sequence diagram

```mermaid
sequenceDiagram
    autonumber
    participant T as Tenant
    participant S as Shell (one per tenant)
    participant WReg as Registry [CDN]
    participant WRen as White-label - Renderer [Server]
    participant WApp as White-label - Application [Component]
    participant WBff as White-label - BFF [Server]
    participant D as Dowstream services
    T->>+S: route(RequestParameters: { id: 'white-label-id', tenantID: 'brand-blue' | 'brand-red', env: 'prod' | 'staging', ... })
    # The route operation should be defined technically depending on the performance budget (SEO constraint, ...): build-time (package consumption) / run-time (dynamic ESM loading) or server-side composition (reverse proxy, server side includes, ...)
    # Request parameters could be provided via environment variables
    S->>+WReg: requestMetadata(requestParameters)
    WReg-->>-S: Result<Metadata: { id, version, apiLinks: { renderer, bff, ... },  renderingMode: 'server' | 'client', ... }>
    S->>+WReg: requestStaticFiles(requestParameters)
    Note right of WReg: White-label static files generated at build-time (from the renderer and application)
    WReg-->>-S: append(staticFiles)
    opt renderingMode is 'server'
        S->>+WRen: renderPageFragment(id, tenantID)
        WRen->>+WBff: getServerSideProps(tenantID)
        loop For as many services as needed
            WBff->>+D: requestData(...)
            D-->>-WBff: Result<DataFromAGivenService>
        end
        WBff-->>-WRen: Result<ServerSideProps>
        WRen->>+WApp: renderToString(serverSideProps)
        WApp-->>-WRen: Result<PageFragment>
        WRen-->>-S: append(pageFragment)
    end
    S-->>-T: Result<Page>
    S->>+WRen: mount(id, tenantID)
    WRen->>+WApp: render(tenantID)
    WApp->>+WBff: requestData(tenantID)
    loop For as many services as needed
        WBff->>+D: requestData(...)
        D-->>-WBff: Result<DataFromAGivenService>
    end
    WBff-->>-WApp: Result<ConsolidatedData>
    WApp-->>-WRen: Result<DOM>
    WRen-->>-S: Result<Mounted>
```

## Assessment

_TODO_
