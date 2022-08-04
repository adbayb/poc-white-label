# single-tenant-renderer

## Pros

- The most flexibility to introduce specificities for a given brand (can be key to secure a release with no mature enough functional requirements)
- The structure favors separation of concerns between the core and brand logic

## Cons

- Setup complexity: each new integration must have a renderer (the renderer is duplicated for each brand -> N renderers for N brands)
- Maintenance complexity: High risk to let brand diverge over time especially if no automation is done. Recreating the same page structure, setuping the white-label application and the wrapper skeleton, ... are as many factors as to keep in mind while creating or updating an existing integration
