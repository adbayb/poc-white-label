<br>
<div align="center">
    <h1>🧪 White-label</h1>
    <strong>Multiple proposals to implement a white-label product.</strong>
</div>
<br>
<br>

## 🤔 Motivation

White-labelling consists of producing generic "plug-and-play" products that can be decorated slightly by each brand to match their identity and make it appear as if they had made it. It comes with two main challenges:

- Customization capabilities: it should enable small variations to adapt it to the brand (eg. logo, colors, ...).
- Hosting model (or [the tenancy model](https://blog.scaleway.com/saas-multi-tenant-vs-multi-instance-architectures/)): depending on the constraints (including scalability, security, isolation, availability, cost, ...), delivering one software and its supporting infrastructure per tenant (or brand: **in the rest of the documentation, brand and tenant can be used interchangeably**) (single-tenant architecture) or a shared one between brands (multi-tenant architecture) can be more suited.

To explore them, a simple white-label product version will be implemented: an hello world page integrated into two brands (arbitrary called `brand-red` and `brand-blue`) with the following requirements:

**Scope**:

- [ ] Shared logic: a generic logic including metadata, content & feature
- [ ] Brand-specific metadata: title and description tag
- [ ] Brand-specific static assets: sitemap
- [ ] Brand-specific UI: button
- [ ] Brand-specific UX: page redirection

**Constraints:**

- [ ] To ease the white-label integration, the changes on the existing should be minimized (existing brand should "only" act as an entrypoint and delegate the integration to a new system)
- [ ] Whatever the used tenancy model, a tenant-specific code should not leak inside another tenant

<br>

## 🧪 Experimentations

### Actors and building blocks involved in proposals

Three systems participate to the white-labelling process:

- **Brand**: The hosting target welcoming the white-label application
- **White-label**: The white label to adapt and integrate into a brand
- **Dependencies**: External resources serving the white-label needs. It can be downstream services (external data sources such as back-end services, feature flag system, ...) and frameworks (shared packages and tools to build white-label products in a standard way)

Let's zoom more specifically into the white-label integration system by enumerating its components (represented by blue boxes in the diagram below):

- **Shell**: The white-label integration orchestrator. By nature, the shell is tightly coupled to the brand (each brand has its own shell) and the white label (the relationship between the shell for a given brand and the white label is always one-to-one). Its main responsibility is to welcome, in the best conditions, a white label inside a brand (ie. decorating it with brand-aware configuration and assets)
- **Renderer**: Manage the white-label rendering strategy (including server-side rendering and client-side bootstrapping/hydration)
- **Application**: The front-end application implementing the core business logic (shared across brands)
- **Back-end service**: The custom-fitted back-end service for the white-label application. To optimize data retrieval on a per client basis, the back-end service can have in front of it one BFF (Backend For Frontend) per client if each consumer has different presentation needs

To sum up, the high-level integration design shared between proposals can be visualized via the following [C4 model](https://c4model.com/):

![Overview](https://user-images.githubusercontent.com/10498826/187178599-61a43567-deab-4c4c-b224-072a486f89e0.png)

### Proposals

To explore white-labelling challenges, two integration scenarios have been identified:

- **[Client-side integration](proposals/client-side-integration)**: Client-side rendered white-label integration ([single-page application approach](https://rubygarage.org/blog/single-page-app-vs-multi-page-app#article_title_1) to support a smooth user experience with hassle-free infrastructure management)
- **[Server-side integration](proposals/server-side-integration)**: Server-side rendered white-label integration ([multi-page application approach](https://rubygarage.org/blog/single-page-app-vs-multi-page-app#article_title_12) to support SEO constraint)

<br>

## 📕 Resources

- [Single- vs Multi-tenant white-label applications](https://stormotion.io/blog/how-to-build-a-white-label-app/#single-multi-tenancy-apps)
