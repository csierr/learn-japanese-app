### STAGE 1: Build ###
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build app
RUN npm run build

### STAGE 2: Serve ###
FROM nginx:stable-alpine

# Copy built static files from builder stage (/app/dist originated from npm run build)
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
