# Ghost Local Development Environment
# N-Tier Architecture with Docker

## Quick Start

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd tf-vs-cdk-vibed/local-development
   ```

2. **Start the services**:
   ```bash
   docker-compose up -d
   ```

3. **Access Ghost**:
   - Ghost Admin: http://localhost/ghost
   - Ghost Content: http://localhost
   - Health Check: http://localhost/health

4. **Seed with test content** (optional):
   ```bash
   # Get your Admin API key from Ghost admin panel first
   export GHOST_ADMIN_API_KEY="your-admin-api-key"
   docker-compose --profile seeder run --rm seeder
   ```

## Architecture

This Docker setup mirrors your N-tier architecture:

- **NGINX** (Public Tier): Reverse proxy with rate limiting, caching, security headers
- **Ghost** (Application Tier): CMS application with Node.js
- **PostgreSQL** (Database Tier): Relational database for content storage
- **Redis** (Cache Tier): Optional caching layer for performance

## Services

### NGINX Reverse Proxy
- **Port**: 80 (HTTP)
- **Features**: Rate limiting, caching, security headers, health checks
- **Config**: `nginx/nginx.conf`

### Ghost CMS
- **Port**: 2368 (internal)
- **Database**: PostgreSQL
- **Features**: Admin API, Content API, image uploads
- **Volumes**: Content persistence

### PostgreSQL Database
- **Port**: 5432 (internal)
- **Database**: ghost_db
- **User**: ghost
- **Password**: ghost_password
- **Features**: Health checks, data persistence

### Redis Cache
- **Port**: 6379 (internal)
- **Features**: Data persistence, append-only file

## Environment Variables

Create a `.env` file for customization:

```bash
# Ghost Admin API Key (get from Ghost admin panel)
GHOST_ADMIN_API_KEY=your-admin-api-key

# Content generation settings
NUM_AUTHORS=8
NUM_TAGS=25
NUM_POSTS=100
NUM_PAGES=10
```

## Useful Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Run seeder
docker-compose --profile seeder run --rm seeder

# Access Ghost container
docker-compose exec ghost sh

# Access PostgreSQL
docker-compose exec postgres psql -U ghost -d ghost_db

# Access Redis
docker-compose exec redis redis-cli

# Clean up everything
docker-compose down -v --remove-orphans
```

## Data Persistence

- **Ghost Content**: `ghost-content` volume
- **PostgreSQL Data**: `postgres-data` volume
- **Redis Data**: `redis-data` volume
- **Images**: `ghost-images` volume

## Performance Testing

This setup is perfect for testing your N-tier architecture:

1. **Load Testing**: Use tools like Apache Bench or Artillery
2. **Database Performance**: Monitor PostgreSQL metrics
3. **Cache Performance**: Test Redis caching effectiveness
4. **Reverse Proxy**: Test NGINX rate limiting and caching

## Troubleshooting

### Ghost won't start
- Check PostgreSQL is healthy: `docker-compose ps`
- Check logs: `docker-compose logs ghost`

### Database connection issues
- Verify PostgreSQL is running: `docker-compose logs postgres`
- Check network connectivity: `docker-compose exec ghost ping postgres`

### NGINX issues
- Check config: `docker-compose exec nginx nginx -t`
- Reload config: `docker-compose exec nginx nginx -s reload`

### Seeder issues
- Verify Admin API key is set
- Check Ghost is accessible: `curl http://localhost/health`

## Next Steps

1. **Test locally** with this Docker setup
2. **Measure performance** with the seeder
3. **Compare** with AWS N-tier architecture
4. **Document** performance differences

This local setup gives you a cost-free way to test your N-tier architecture before deploying to AWS! 🚀
