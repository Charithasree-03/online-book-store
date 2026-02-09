# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Run Stage ----------
FROM nginx:alpine

# ✅ Copy built Angular files to nginx html folder
# If your dist folder is dist/OnlineBookStoreUI then keep it
COPY --from=build /app/dist /usr/share/nginx/html

# ✅ Nginx config for Angular routes
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
