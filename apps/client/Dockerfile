FROM node:25-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm
COPY apps/client/package.json apps/client/pnpm-lock.yaml ./

RUN pnpm install

COPY apps/client ./

RUN pnpm run build

FROM node:25-alpine AS production

WORKDIR /app

RUN npm install -g pnpm
COPY apps/client/package.json apps/client/pnpm-lock.yaml ./

RUN pnpm install

COPY --from=builder /app/dist ./dist
COPY proto ./proto
COPY certs ./certs

CMD ["node", "dist/main.js"]