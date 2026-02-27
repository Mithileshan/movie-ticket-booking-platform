# Server Dockerfile - Node.js Express API
FROM node:16-alpine

WORKDIR /app/server

# Copy package files
COPY server/package*.json ./

# Install dependencies with legacy peer deps for older React packages
RUN npm install --legacy-peer-deps

# Copy source code
COPY server/src ./src

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080', (r) => {if (r.statusCode !== 404) throw new Error(r.statusCode)})"

# Start server
CMD ["node", "src/index.js"]
