# Use Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose the application's port
EXPOSE 3000

# Command to run migrations and start the server with PM2
CMD ["sh", "-c", "npm run migrate && pm2-runtime pm2.config.cjs"]
