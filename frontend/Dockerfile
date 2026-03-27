# --- STAGE 1: Base Setup ---
FROM node:24-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# --- STAGE 2: Dependencies
FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch
COPY . .
RUN CI=true pnpm install --frozen-lockfile

# --- STAGE 3: Build
FROM deps AS build
RUN pnpm run build --configuration=production

# --- STAGE 4: Production (Nginx)
FROM nginx:stable-alpine AS runtime
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]