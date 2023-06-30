# STAGE 1: install
FROM docker.io/node:16-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /base

# Install dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


RUN rm -rf ./.next/cache

# STAGE 2: build
FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base/node_modules ./node_modules
COPY . .
RUN yarn build

# STAGE 3: app
FROM base AS app
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build /build/public ./public
COPY --from=build --chown=nextjs:nodejs /build/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /build/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]