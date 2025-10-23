# Local Development Environment

This directory contains all the files needed to run and test the N-tier blog architecture locally using Docker. This is a complete local development environment that mirrors the AWS infrastructure you'll be building with Terraform and CDK.

## What's Here

### Core Infrastructure Files
- `docker-compose.yml` - Complete N-tier architecture orchestration
- `Dockerfile.seeder` - Containerized content generation tool
- `nginx/` - NGINX reverse proxy configuration
- `postgres/` - PostgreSQL database initialization scripts

### Content Generation
- `ghost-content-seeder.js` - Faker.js-based content generator
- `package.json` - Node.js dependencies for content seeder
- `ghost-seeder-README.md` - Detailed seeder documentation

### Scripts & Documentation
- `start-local.sh` - Quick start script for local development
- `QUICK-START.md` - Simple getting started guide
- `docker-local-README.md` - Comprehensive Docker setup guide

## Quick Start

1. **Navigate to this directory**:
   ```bash
   cd local-development
   ```

2. **Start everything**:
   ```bash
   docker-compose up -d
   ```

3. **Access Ghost**:
   - Admin: http://localhost/ghost
   - Content: http://localhost
   - Health: http://localhost/health

4. **Seed with test content** (optional):
   ```bash
   # Get Admin API key from Ghost admin panel first
   export GHOST_ADMIN_API_KEY="your-key"
   docker-compose --profile seeder run --rm seeder
   ```

## Architecture

This local setup mirrors your planned AWS N-tier architecture:

- **NGINX** (Public Tier): Reverse proxy with rate limiting and caching
- **Ghost** (Application Tier): Node.js CMS application
- **PostgreSQL** (Database Tier): Relational database for content
- **Redis** (Cache Tier): Optional caching layer

## Purpose

This local environment allows you to:
- Test your N-tier architecture before AWS deployment
- Generate realistic test content for performance testing
- Validate configurations and settings
- Develop and test without AWS costs
- Compare local vs cloud performance

## Next Steps

After testing locally, you'll implement the same architecture using:
- `../tf/` - Terraform infrastructure as code
- `../cdk/` - AWS CDK infrastructure as code

This gives you a complete comparison between local development and cloud deployment using both IaC tools.
