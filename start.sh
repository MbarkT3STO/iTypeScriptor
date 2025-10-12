#!/bin/bash

# Start script for iTypeScriptor
echo "🚀 Starting iTypeScriptor..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build TypeScript if needed
if [ ! -d "dist" ] || [ "src/main.ts" -nt "dist/main.js" ]; then
    echo "🔨 Building TypeScript..."
    npm run build
fi

# Start the app
echo "✨ Launching iTypeScriptor..."
npm start

