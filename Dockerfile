# Optimize Railway deployment
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port (Railway sets this automatically)
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
