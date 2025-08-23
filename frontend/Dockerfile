# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
COPY shared /app/shared

RUN npm run build

# ---------- Runtime Stage ----------
FROM node:20-alpine

WORKDIR /app/frontend

COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
