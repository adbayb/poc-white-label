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
- Hosting model (or [the tenancy model](https://blog.scaleway.com/saas-multi-tenant-vs-multi-instance-architectures/)): depending on the constraints (including scalability, security, isolation, availability, cost, ...), delivering one software and its supporting infrastructure per brand (or tenant) (single-tenant architecture) or a shared one between brands (multi-tenant architecture) can be more suited.

To explore them, a simple white-label product version will be implemented: an hello world page integrated into two brands (arbitrary called `brand-red` and `brand-blue`) with the following requirements:

**Scope**:

- [ ] Shared logic: a generic logic including metadata, content & feature
- [ ] Brand-specific assets: sitemap
- [ ] Brand-specific UI: button
- [ ] Brand-specific UX: page redirection
- [ ] Brand-specific metadata: title and description tag

**Constraints:**

- [ ] To ease the white-label integration, the changes on the existing should be minimized (existing brand should "only" act as an entrypoint and delegate the integration to a new system)
- [ ] Whatever the used tenancy model, a tenant-specific code should not leak inside another tenant
- [ ] The integration strategy is fixed: the white-label will be integrated as a micro-application (ie. will take visually the full page) and rendered server-side (via Next.js framework). Experimenting different integration solutions is out of this exploration scope since it's a more global topic (typically linked to the monolithic vs micro-frontend architecture) not exclusive to the white-labelling process. To dig deeper on available techniques, you can check [the following repository meant for that purpose](https://github.com/adbayb/poc-micro-frontend).

<br>

## 🧪 Experimentations

### Actors and building blocks involved in proposals

Four main actors participate to the white-labelling process:

- **Tenant**: The brand application hosting the white-label application
- **Shell**: The tenant-aware white-label integration orchestrator (each tenant has its own shell). Its main responsibility is to welcome, in the best conditions, a white-label inside a tenant (ie. decorating it with tenant-aware configuration)
- **Registry**: Global white-label registry to discover and serve critical white-label resources (by critical, we mean all resources (URL, metadata, static files) needed to display the white-label)
- **White-label**: The white-label application to adapt and integrate into a tenant
- **Downstream services**: Provide needed data from a given source (eg. backend service, authorization server, third party service like feature flag system, ...)

Let's zoom into the white-label actor by enumerating its components:

- **Renderer**: Manage the white-label rendering strategy (including server-side rendering and client-side bootstrapping/hydration)
- **Application**: Core business logic implementation (shared across brands)
- **BFF (Backend For Frontend)**: Manage communication with external systems and deliver the consolidated data to the requestor. It acts as an ACL and consolidated data provider for the white-label needs

### Proposals

To explore white-labelling challenges, three proposals have been explored:

- [Multi-tenant architecture](proposals/multi-tenant): One white-label infrastructure shared across tenants (a single software runtime serves multiple customers)
- [Single-tenant architecture with one renderer codebase](proposals/single-tenant-shared-renderer): One white-label infrastructure per tenant (a single software runtime serves a single customer) with a single shared renderer codebase
- [Single-tenant architecture with multi-renderer codebases](proposals/single-tenant-separate-renderer): One white-label infrastructure and one renderer codebase per tenant

<br>

## 📕 Resources

- [Single- vs Multi-tenant white-label applications](https://stormotion.io/blog/how-to-build-a-white-label-app/#single-multi-tenancy-apps)
