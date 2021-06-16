FROM node:lts-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine

WORKDIR /var/www/public
COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
