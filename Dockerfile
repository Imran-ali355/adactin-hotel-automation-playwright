# Use the official Playwright image matching your version
FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

# Copy dependency manifest files first for caching
COPY package*.json ./

RUN npm ci

# Copy the rest of the project files
COPY . .

# Run tests by default
CMD ["npx", "playwright", "test"]