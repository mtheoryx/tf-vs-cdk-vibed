# Ghost N-Tier Stack - Quick Start Guide 🚀

*Simple instructions for running the Ghost CMS with N-tier architecture locally*

## Prerequisites

Make sure you have Docker installed:
- **Mac**: Download from [docker.com](https://www.docker.com/products/docker-desktop/)
- **Windows**: Download from [docker.com](https://www.docker.com/products/docker-desktop/)
- **Linux**: Follow [Docker installation guide](https://docs.docker.com/engine/install/)

## Quick Commands

### 🟢 Start Everything
```bash
docker-compose up -d
```
*This starts all services in the background*

### 🔴 Stop Everything
```bash
docker-compose down
```
*This stops all services*

### 🔄 Reset Everything (Fresh Start)
```bash
docker-compose down -v
docker-compose up -d
```
*This removes all data and starts fresh*

### 📊 Check Status
```bash
docker-compose ps
```
*Shows which services are running*

## Access Points

Once running, you can access:

| Service | URL | What It Is |
|---------|-----|------------|
| **Ghost Admin** | http://localhost/ghost | Create account, manage content |
| **Ghost Site** | http://localhost | View the actual website |
| **Health Check** | http://localhost/health | Verify everything is working |

## First Time Setup

1. **Start the stack**: `docker-compose up -d`
2. **Wait 30 seconds** for everything to start
3. **Go to**: http://localhost/ghost
4. **Create your admin account** (name, email, password)
5. **You're ready to go!**

## Troubleshooting

### "Port already in use" error
```bash
# Stop everything first
docker-compose down

# Then restart
docker-compose up -d
```

### "Can't connect" errors
```bash
# Check if services are running
docker-compose ps

# If Ghost is restarting, check logs
docker-compose logs ghost
```

### Want to see what's happening?
```bash
# Watch logs in real-time
docker-compose logs -f

# Stop watching with Ctrl+C
```

## What's Running

This stack includes:
- **NGINX**: Reverse proxy (handles web traffic)
- **Ghost**: Content management system
- **MySQL**: Database (stores all content)
- **Redis**: Cache (makes things faster)

## Need Help?

If something's not working:
1. Try `docker-compose down` then `docker-compose up -d`
2. Check `docker-compose ps` to see what's running
3. Look at `docker-compose logs` for error messages

## Pro Tips

- **Data persists**: Your content stays even after stopping/starting
- **Fresh start**: Use `docker-compose down -v` to wipe everything
- **Background mode**: Services keep running even if you close terminal
- **Resource usage**: This uses about 1-2GB RAM when running

---

*That's it! You now have a full Ghost CMS running locally with professional N-tier architecture.* 🎉
