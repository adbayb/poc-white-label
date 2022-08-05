# single-tenant-component

## Pros

- One single source of truth (the renderer) for all brands to manage the core logic, the routing, BFF. _It's important to keep in mind that the single renderer is only code-side: there'll be one renderer built per brand (single-tenant architecture)_
- Configuration contract to manage the brand specificities via a React component (`<Shell {...props} />`)
- Consequently, ease the white-label and brand maintenance

## Cons

- Less flexibility on the unknown: the shell component scopes the brand configuration possibility
