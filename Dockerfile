FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/.next ./.next

COPY package.json package-lock.json ./
RUN npm ci --production --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "start"]