# poc-white-label

A white-label solution proposal

## Scope

For the sake of experimentation, a simple white-label product version will be implemented.
It consists of displaying a welcome page into two brands (arbitrary called `brandA` and `brandB`) with following requirements:

- [ ] Shared logic: a common business logic including metadata, content & feature
- [ ] Brand-specific configuration: UI with logo and button
- [ ] Brand-specific configuration: metadata with the title tag
- [ ] Brand-specific configuration: link to a specific page
- [ ] Brand-specific configuration: feature toggle

## Architecture

### Overview

Before describing each integration proposal, let's see what are the main technical building blocks (containers and components) shared between proposals:

Four main containers compose the integration framework:

- Host: The brand application consuming the white-label
- Host registry: Global brand registry providing brand-aware configurations (HTML, metadata, theme, ...). It adapts the white-label experience with brand requirements
- White-label: The white-label product to adapt and integrate into an host target
- Downstream services: Provide needed data from a given source (eg. backend service, authorization server, third party service like feature flag system, ...)

Let's zoom into the white-label container by listing its components:

- Renderer: Top-level wrapper managing the white-label application rendering (including brand configuration consumption)
- Application: Implement the core business logic (shared between brands)
- Data provider: Manage communication with external systems (ACL) and deliver the consolidated data to the requestor

### Multi-tenant architecture

Single shared renderer between brands configurable via a registry.

##### Component diagram

<img alt="Component diagram for multi-tenant proposal" src="https://user-images.githubusercontent.com/10498826/182594053-786d4fb3-d0ec-470d-bdf2-c57e6d71e47f.png">

##### Sequence diagram

```mermaid
sequenceDiagram
    autonumber
    participant H as Host
    participant WR as White-label renderer [Server for SSR / CDN for CSR]
    # Dedicated component since the composition host-side are common concerns across white-labels (including white-label lifecycle management).
    # In any case, the shell will be needed, at least, to manage white-label lifecycle (mount/unmount/error/loading) and forward the brand theme (design tokens) to the white-label (it's not the white-label responsibility to retrieve the brand theme, its sole responsibility will be to open its API to accept the theme affectation from the shell).
    participant HR as Host registry [CDN]
    participant WA as White-label application [Component]
    participant WB as White-label data provider [BFF]
    participant D as Dowstream services
    H->>+WR: route(ParametersFromBrand: { hostID: 'brandA' | 'brandB' | '...', env: 'prod' | 'staging', ... })
    # Request parameters could be managed through environment variables
    WR->>+HR: requestBrandConfiguration(parametersFromBrand)
    HR-->>-WR: Result<BrandConfigurationContract: { hostID, theme, links, meta, ... }>
    # The integration operation should be defined technically depending on the performance budget (SEO constraint, ...): build-time (package consumption) / run-time (dynamic ESM loading) or server-side composition (reverse proxy, server side includes, ...)
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

### Single-tenant architecture

Multi renderers (one per brand to manage each one specificity).

<img alt="Component diagram for multi-tenant proposal" src="https://user-images.githubusercontent.com/10498826/182627311-72f72069-fc2f-4e77-8ab5-0cd47ca8e9fb.png">
