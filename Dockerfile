# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Angular application
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular files to Nginx static directory
COPY --from=build /app/dist/web-iclisten /usr/share/nginx/html

# Expose port 80 for Koyeb
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
