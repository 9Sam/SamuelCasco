# ADR 02: Modern Tech Stack (Angular 21, Node 24 and pnpm)

**Date:** 2026-03-26
**Status:** Accepted
**Impact:** High

### Context and Drivers

* Secure and high-performance development environment.
* Compatibility with the latest version of angular.

### Decision

We have decided to use the latest version of Angular and Node because:

1. Node 24 Alpine for docker provides higher compatibility with the latest version of Angular
2. The environment was configured to run on docker by default, using the same version of node is intended for compatibility and standarization.

We have decided to use pnpm because:

1. It provides a better development experience because its fast integration and performance in the development cycle.

### Consequences

* **✅ Pros:** Better integration with high-performance systems and improved core tools.
* **⚠️ Cons:** Compatibiliy with older resource packages could be compromised.
