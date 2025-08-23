# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app/backend

COPY backend/package*.json ./
COPY backend/tsconfig.json ./
COPY backend/src ./src
COPY shared /app/shared

RUN npm install
RUN npm run build

# ---------- Runtime Stage ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./package.json

EXPOSE 5005

CMD ["node", "dist/backend/src/server.js"]
