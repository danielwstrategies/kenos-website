# Coolify Deployment Guide

## Quick Start

This guide covers deploying the First Mate website to Coolify (self-hosted platform).

## Prerequisites

- Coolify server with Docker installed
- MongoDB Atlas database (see [mongodb-atlas-setup.md](./mongodb-atlas-setup.md))
- Domain pointed to Coolify server IP
- GitHub repository access

## Environment Variables

Add these to your Coolify application settings:

```bash
# Database
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/firstmate

# Payload CMS
PAYLOAD_SECRET=your-random-secret-32-chars-min
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com

# Optional: On-Demand Revalidation
REVALIDATE_SECRET=your-revalidation-secret

# Node Environment
NODE_ENV=production
PORT=3011
```

**Generate secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deployment Steps

### 1. Create Application in Coolify

1. Log into Coolify dashboard
2. Click **New Resource** → **Application**
3. Select your server
4. Choose **Public Repository** or connect GitHub
5. Enter repository URL: `https://github.com/yourusername/first-mate-2`
6. Set build pack: **Nixpacks** (auto-detected)

### 2. Configure Build Settings

- **Build Command**: `npm run build`
- **Start Command**: `npm start` (uses custom server)
- **Port**: `3011`
- **Health Check Path**: `/health`

### 3. Add Environment Variables

In Coolify application settings → Environment:
- Add all variables from Prerequisites section
- Click **Save**

### 4. Configure Domain

1. In Coolify: Settings → Domains
2. Add your domain: `yourdomain.com`
3. Enable **HTTPS** (Let's Encrypt auto-configured)
4. Coolify uses Traefik for SSL certificates

### 5. Deploy

1. Click **Deploy** button
2. Monitor build logs
3. Wait for health checks to pass
4. Access site at your domain

## Health Checks

The app includes a `/health` endpoint for monitoring:

```bash
curl https://yourdomain.com/health
# Expected: {"status":"ok"}
```

Coolify automatically:
- Checks `/health` every 10 seconds
- Marks container unhealthy after 3 failures
- Restarts container if unhealthy

## Custom Server (Important!)

This project uses a **custom Express server** (`src/server.ts`) that integrates Next.js and Payload CMS.

**Why it matters:**
- `package.json` uses `tsx src/server.ts`, not `next start`
- Server must initialize both Next.js and Payload
- Express 5 requires specific route patterns (see troubleshooting)

**Correct start script:**
```json
{
  "scripts": {
    "start": "NODE_ENV=production tsx src/server.ts"
  }
}
```

## Common Issues & Solutions

### Issue: "Cannot GET /" Error

**Symptom:** Site loads but shows plain text error  
**Cause:** Next.js handler not integrated in custom server  
**Solution:** Verify `src/server.ts` includes:

```typescript
app.use((req, res) => nextHandler(req, res))
```

**DO NOT USE** (Express 5 incompatible):
```typescript
app.all('*', ...)  // ❌ Causes parameter error
app.get('*', ...)  // ❌ Wildcard not supported
```

See [deployment-issue-log.md](./deployment-issue-log.md) for full details.

### Issue: Health Checks Failing

**Symptom:** Container marked unhealthy, restarts repeatedly  
**Cause:** App crashed on startup or `/health` not responding  
**Solution:**
1. Check application logs in Coolify
2. Verify environment variables set correctly
3. Test MongoDB connection string
4. Ensure `src/server.ts` has health endpoint:
   ```typescript
   app.get('/health', (req, res) => {
     res.status(200).json({ status: 'ok' })
   })
   ```

### Issue: SSL Certificate Errors

**Symptom:** ACME challenge failures in Traefik logs  
**Note:** These are usually bot scans, not actual issues  
**Check:**
1. Domain DNS pointing to server IP (A record)
2. Port 80/443 open on server
3. Coolify Traefik container running
4. Wait 5-10 minutes for Let's Encrypt provisioning

### Issue: Application Unresponsive

**Symptom:** Site stops responding, requires redeploy  
**Possible causes:**
- Memory limit reached (check container stats)
- Database connection timeout
- Uncaught exception in code

**Debug:**
```bash
# SSH into Coolify server
ssh user@your-server

# Check container logs
docker logs -f <container-name>

# Check resource usage
docker stats <container-name>

# View Traefik logs
docker logs -f coolify-proxy
```

## Monitoring

### Application Logs

Access in Coolify dashboard:
1. Select your application
2. Click **Logs** tab
3. Watch real-time output

Or via terminal:
```bash
docker logs -f <container-name> --tail 100
```

### Health Status

Check health endpoint:
```bash
curl https://yourdomain.com/health
```

Coolify dashboard shows:
- **Healthy** = Green indicator
- **Starting** = Yellow indicator
- **Unhealthy** = Red indicator (triggers restart)

### Database Connection

MongoDB Atlas dashboard shows:
- Active connections
- Query performance
- Network access rules

## Updates & Redeployment

### Automatic Deployments

Coolify can auto-deploy on Git push:
1. Settings → Git
2. Enable **Auto Deploy**
3. Select branch (usually `main`)
4. Coolify watches for commits

### Manual Deployment

1. Click **Deploy** button in Coolify
2. Or use Coolify CLI:
   ```bash
   coolify deploy <app-id>
   ```

### Zero-Downtime Deploys

Coolify supports rolling updates:
- New container starts
- Health checks pass
- Old container stops
- Traffic switches over

## Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] MongoDB Atlas IP whitelist includes Coolify server
- [ ] Domain DNS pointed correctly
- [ ] HTTPS enabled and working
- [ ] Health endpoint responding
- [ ] Test creating/editing content in admin
- [ ] Verify on-demand revalidation working (if enabled)
- [ ] Check application logs for errors
- [ ] Test all major pages load correctly
- [ ] Mobile responsiveness verified

## Scaling

Coolify supports horizontal scaling:
1. Settings → Resources
2. Increase **Replicas** count
3. Load balancer distributes traffic

**Note:** Ensure MongoDB handles concurrent connections

## Backup

### Database Backup

MongoDB Atlas provides:
- Automatic snapshots (daily)
- Point-in-time recovery
- Manual backup triggers

### Application Code

- Stored in Git repository
- Coolify pulls from GitHub
- No local state to backup

### Media Files

If using local storage:
1. Mount persistent volume in Coolify
2. Regular backups via server snapshots
3. Or use S3-compatible storage

## Troubleshooting Commands

```bash
# SSH into Coolify server
ssh user@your-server-ip

# List all containers
docker ps -a

# View application logs
docker logs -f <container-name>

# Check health endpoint
curl http://localhost:3011/health

# Restart container
docker restart <container-name>

# View Traefik logs (SSL/proxy)
docker logs -f coolify-proxy

# Check resource usage
docker stats <container-name>
```

## Support Resources

- **Coolify Docs**: https://coolify.io/docs
- **Deployment Issue Log**: [deployment-issue-log.md](./deployment-issue-log.md)
- **MongoDB Setup**: [mongodb-atlas-setup.md](./mongodb-atlas-setup.md)
- **Troubleshooting**: [troubleshooting-log.md](./troubleshooting-log.md)

## Quick Reference

| What | Where |
|------|-------|
| **Frontend** | https://yourdomain.com |
| **Admin Panel** | https://yourdomain.com/admin |
| **Health Check** | https://yourdomain.com/health |
| **Coolify Dashboard** | https://your-coolify-server.com |
| **Application Logs** | Coolify → Logs tab |
| **Container Name** | Shown in Coolify dashboard |

## Next Steps

After successful deployment:
1. Set up on-demand revalidation (see [odr-readme.md](./odr-readme.md))
2. Configure custom 404 page
3. Add analytics tracking
4. Set up monitoring alerts
5. Plan content migration strategy

## Related Documentation

- **Quick Start**: [deployment-quickstart.md](./deployment-quickstart.md)
- **Deployment Issues**: [deployment-issue-log.md](./deployment-issue-log.md)
- **MongoDB Setup**: [mongodb-atlas-setup.md](./mongodb-atlas-setup.md)
- **ODR Setup**: [odr-readme.md](./odr-readme.md)
- **All Docs**: [index.md](./index.md)
