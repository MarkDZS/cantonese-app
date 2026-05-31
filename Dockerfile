FROM node:20-slim

WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files and install
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY . .

# Create data directory for SQLite persistence
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Set DB path to persist in volume
ENV DB_PATH=/app/data/cantonese.db

# Initialize DB and start server
CMD node database/init.js && node server.js
