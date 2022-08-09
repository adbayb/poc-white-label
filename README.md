# poc-white-label

A white-label solution proposal

# Scope

For the sake of experimentation, a simple white-label product version will be implemented.
It consists of displaying a welcome page into two brands (arbitrary called `brand-red` and `brand-blue`) with following requirements:

- [ ] Shared logic: a common business logic including metadata, content & feature
- [ ] Brand-specific configuration: UI with logo and button
- [ ] Brand-specific configuration: metadata with the title tag
- [ ] Brand-specific configuration: link to a specific page
- [ ] Brand-specific configuration: feature toggle
- [ ] Brand-specific configuration: serve specific assets (robots.txt)
- [ ] SSR friendly

# Architecture

## Overview

Before describing each integration proposal, let's see what are the main building blocks shared between proposals:

Four containers compose the integration system:

- **Tenant**: The brand application hosting the white-label application
- **Shell**: The integration orchestrator. Its main responsibility is to enable the white-label application integration into the tenant in the best possible conditions (eg. retrieving the white-label logic, decorating it with tenant-aware configuration, managing its loading lifecycle, ...)
- **Registry**: Global white-label registry to discover and serve critical white-label resources (by critical, we mean all resources (URL, metadata, static files) needed to display the white-label)
- **White-label**: The white-label application to adapt and integrate into a tenant
- **Downstream services**: Provide needed data from a given source (eg. backend service, authorization server, third party service like feature flag system, ...)

Let's zoom into the white-label container by enumerating its components:

- **Renderer**: Top-level wrapper managing the white-label rendering (including brand configuration consumption)
- **Application**: Core business logic implementation (shared across brands)
- **BFF (Backend For Frontend)**: Manage communication with external systems and deliver the consolidated data to the requestor. It acts as an ACL and consolidated data provider for the white-label needs

## Multi-tenant architecture

One white-label instance shared across tenants (a single software runtime serves multiple customers).

#### Component diagram

![Component diagram for multi-tenant proposal](https://user-images.githubusercontent.com/10498826/183674693-f89f8222-1b46-4bff-8c06-3f81ee74e2b5.png)

#### Sequence diagram

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

## Single-tenant architecture

One white-label instance per tenant (a single software runtime serves a single customer).

![Component diagram for single-tenant proposals](https://user-images.githubusercontent.com/10498826/183674508-c50ffe2f-e1b1-454b-9f46-dd34c83c1923.png)
