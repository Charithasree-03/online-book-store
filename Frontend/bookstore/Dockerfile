# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Run Stage ----------
FROM nginx:alpine

# Copy built Angular files - Angular 21 outputs to dist/bookstore/browser
COPY --from=build /app/dist/bookstore/browser /usr/share/nginx/html

# Nginx config for Angular routes and API proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
