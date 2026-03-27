# ADR 01: Docker integration and project merge

**Date:** 2026-03-26
**Status:** Accepted
**Impact:** High

### Context and Drivers

* **Requirement:** Provide a fast and accesible way to access both projects and allow interoperativity without much hustle.
* **Constraint:** Frontend and api were treated as separated sources.

### Decision

We have decided to use Docker and merge both projects in same repository because:

1. Provides a fast and reliable way to start the project on any machine.
2. Having both projects in the same repository provides and easier way to jump between tasks reducing context switching.

### Consequences

* **✅ Pros:**
  * Faster develpment and production pass experience.
  * Increase project portability and testing.
* **⚠️ Cons:** Requires having docker installed in the host machine.
