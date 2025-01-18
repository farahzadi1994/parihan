# FROM node:latest as build
# WORKDIR /app
# COPY package.json .
# RUN yarn install
# COPY . .
# RUN yarn run build
# FROM nginx
# COPY --from=build /app/.next /usr/share/nginx/html

# Base
FROM node:20-bullseye as base
WORKDIR /app
COPY package*.json ./
RUN yarn install

# Build
FROM node:20-bullseye as builder
WORKDIR /app
ENV NODE_ENV=production

COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN yarn run build

# Reduce installed packages to production-only.
# RUN npm prune --production

# Production
FROM node:20-bullseye as prod
WORKDIR /app
# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/public ./standalone/public
COPY --from=builder /app/.next/static ./standalone/.next/static

CMD ["node", "./standalone/server.js"]