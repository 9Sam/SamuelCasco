# --- STAGE 1: Base Setup ---
FROM node:24-alpine AS base
RUN corepack enable
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# --- STAGE 2: Dependencies
FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch
COPY . .
RUN CI=true pnpm install --frozen-lockfile

# --- STAGE 3: Build
FROM deps AS build
RUN pnpm run build

# --- STAGE 4: Production
FROM node:lts AS runtime
RUN groupadd -g 1001 appgroup && \
    useradd -u 1001 -g appgroup -m -d /app -s /bin/false appuser
WORKDIR /app
COPY --from=build --chown=appuser:appgroup /app ./
ENV NODE_ENV=production \
    NODE_OPTIONS="--enable-source-maps"
USER appuser
ENTRYPOINT ["node", "dist/ main.js"]