#!/bin/bash

# Ghost Local Development Quick Start Script
# This script sets up and starts your local Ghost N-tier architecture

set -e

echo "🚀 Ghost Local Development Setup"
echo "================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose > /dev/null 2>&1; then
    echo "❌ docker-compose is not installed. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker is running"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file and add your Ghost Admin API key"
    echo "   You can get this from the Ghost admin panel after first setup"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p nginx/conf.d
mkdir -p nginx/ssl
mkdir -p postgres/init

# Start services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if Ghost is accessible
echo "🔍 Checking Ghost status..."
if curl -s http://localhost/health > /dev/null; then
    echo "✅ Ghost is running!"
    echo ""
    echo "🎉 Setup complete! You can now access:"
    echo "   - Ghost Admin: http://localhost/ghost"
    echo "   - Ghost Content: http://localhost"
    echo "   - Health Check: http://localhost/health"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Go to http://localhost/ghost and create your admin account"
    echo "   2. Get your Admin API key from Settings → Integrations"
    echo "   3. Add the API key to your .env file"
    echo "   4. Run: docker-compose --profile seeder run --rm seeder"
    echo ""
    echo "🛠️  Useful commands:"
    echo "   - View logs: docker-compose logs -f"
    echo "   - Stop services: docker-compose down"
    echo "   - Restart: docker-compose restart"
else
    echo "❌ Ghost is not accessible. Check the logs:"
    echo "   docker-compose logs ghost"
    exit 1
fi
