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

### Sequence diagram

```mermaid
sequenceDiagram
    autonumber
    participant H as Host
    participant S as Shell
    participant WReg as Registry [CDN]
    participant WRen as White-label renderer (including application) [Server]
    participant WBff as White-label BFF [Server]
    participant D as Dowstream services
    H->>+S: route(RequestParameters: { id: 'white-label-id', hostId: 'brand-blue' | 'brand-red', env: 'prod' | 'staging', ... })
    # The route operation should be defined technically depending on the performance budget (SEO constraint, ...): build-time (package consumption) / run-time (dynamic ESM loading) or server-side composition (reverse proxy, server side includes, ...)
    # Request parameters could be managed through environment variables
    S->>+WReg: requestMetadata(requestParameters: RequestParameters)
    WReg-->>-S: Result<Metadata: { id, version, apiLinks: { renderer, bff, ... },  renderingMode: 'server' | 'client', ... }>
    S->>+WReg: requestStaticFiles(requestParameters: RequestParameters)
    WReg-->>-S: Result<StaticFiles>
    opt renderingMode is 'server'
        S->>+WRen: render(hostId)
        WRen->>+WBff: requestData()
        loop For as many services as needed
            WBff->>+D: requestData()
            D-->>-WBff: Result<DataFromAGivenService>
        end
        WBff-->>-WRen: Result<ConsolidatedData>
        WRen->>+WRen: renderSSR(consolidatedData)
        WRen-->>-WRen: Result<PageFragment: { meta, content }>
        WRen-->>-S: Result<PageFragment>
        activate S
    end
    S->>+WBff: requestData()
    loop For as many services as needed
        WBff->>+D: requestData()
        D-->>-WBff: Result<DataFromAGivenService>
    end
    WBff-->>-S: Result<ConsolidatedData>
    S-->>-H: Result<Mounted>
```

```mermaid
sequenceDiagram
    autonumber
    participant H as Host
    participant WR as White-label renderer [Server for SSR / CDN for CSR]
    participant HR as Host registry [CDN]
    participant WA as White-label application [Component]
    participant WB as White-label data provider [BFF]
    participant D as Dowstream services
    H->>+WR: route(ParametersFromBrand: { hostID: 'brand-red' | 'brand-blue' | '...', env: 'prod' | 'staging', ... })
    WR->>+HR: requestBrandConfiguration(parametersFromBrand)
    HR-->>-WR: Result<BrandConfigurationContract: { hostID, theme, links, meta, ... }>
    WR->>WA: import()
    opt renderingMode is 'server'
        WR->>+WB: getServerSideProps(hostID)
        loop For as many services as needed
            WB->>+D: requestData(...)
            D-->>-WB: Result<DataFromAGivenService>
        end
        WB-->>-WR: Result<ServerSideProps>
        WR->>+WA: render(brandMetadata, serverSideProps)
        WA-->>-WR: Result<RenderedHTML>
    end
    WR-->>-H: Result<WhiteLabelAssets: { html, js, css, ... }>
    H->>+WA: mount()
    WA->>+WB: requestData(hostID)
    loop For as many services as needed
        WB->>+D: requestData(...)
        D-->>-WB: Result<DataFromAGivenService>
    end
    WB-->>-WA: Result<ConsolidatedData>
    WA-->>-H: Result<Mounted>
```

## Assessment

_TODO_
