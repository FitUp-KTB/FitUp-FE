FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ARG NEXT_PUBLIC_BASE_URL

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm ci --production --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]
