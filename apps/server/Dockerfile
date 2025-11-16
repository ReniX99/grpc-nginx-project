FROM node:25-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm
COPY apps/server/package.json apps/server/pnpm-lock.yaml ./

RUN pnpm install

COPY apps/server ./

RUN pnpm run build

FROM node:25-alpine AS production

WORKDIR /app

RUN npm install -g pnpm
COPY apps/server/package.json apps/server/pnpm-lock.yaml ./

RUN pnpm install

COPY --from=builder /app/dist ./dist
COPY proto ./proto
COPY certs ./certs

CMD ["node", "dist/main.js"]