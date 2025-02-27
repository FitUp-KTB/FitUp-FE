FROM node:18-alpine AS builder
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# 전체 소스 복사 및 빌드
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/.next ./.next

# production 의존성 설치
RUN npm ci --production --legacy-peer-deps

EXPOSE 3000

CMD ["npm", "start"]
