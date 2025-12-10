# Deployment Quick Start

This guide helps you deploy a duplicate of this project from scratch.

## Prerequisites

- GitHub repository (public or private)
- Coolify server (self-hosted)
- MongoDB Atlas account (free tier OK)

## Step 1: Fork/Clone Repository

```bash
# Clone this repo
git clone https://github.com/yourusername/first-mate-2.git
cd first-mate-2

# Or fork on GitHub and clone your fork
```

## Step 2: Set Up MongoDB Atlas

Follow **[mongodb-atlas-setup.md](./mongodb-atlas-setup.md)** or quick steps:

1. Create account at https://cloud.mongodb.com
2. Create free cluster
3. Create database user
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`
5. Add IP `0.0.0.0/0` to Network Access (allow all)

## Step 3: Configure Environment Variables

Generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Required variables:
```bash
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/firstmate
PAYLOAD_SECRET=<generated-secret-1>
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
REVALIDATE_SECRET=<generated-secret-2>
NODE_ENV=production
PORT=3011
```

## Step 4: Deploy to Coolify

### 4.1 Create Application

1. Open Coolify dashboard
2. Click **New Resource** → **Application**
3. Choose repository source (GitHub)
4. Select repository: `first-mate-2`
5. Build pack: **Nixpacks** (auto-detected)

### 4.2 Configure Settings

**Build:**
- Build Command: `npm run build`
- Start Command: `npm start`
- Port: `3011`

**Health Check:**
- Path: `/health`
- Interval: 10s
- Timeout: 5s
- Retries: 3

### 4.3 Add Environment Variables

In Coolify → Settings → Environment, add all variables from Step 3.

### 4.4 Configure Domain

1. Point your domain DNS A record to Coolify server IP
2. In Coolify: Settings → Domains
3. Add domain: `yourdomain.com`
4. Enable HTTPS (Let's Encrypt automatic)

### 4.5 Deploy

Click **Deploy** button and monitor logs.

Expected flow:
```
Building → Running health checks → Healthy → Running
```

## Step 5: Verify Deployment

```bash
# Test health endpoint
curl https://yourdomain.com/health
# Expected: {"status":"ok"}

# Access frontend
open https://yourdomain.com

# Access admin
open https://yourdomain.com/admin
```

## Step 6: Create Admin User

1. Visit `https://yourdomain.com/admin`
2. Complete first-time setup
3. Create admin account

## Step 7: Seed Content (Optional)

```bash
curl https://yourdomain.com/api/seed-firstmate
```

Or create content manually in admin panel.

## Troubleshooting

### Deployment Fails

Check Coolify logs for errors. Common issues:

**"Cannot GET /"**
- See [deployment-issue-log.md](./deployment-issue-log.md)
- Verify `src/server.ts` uses `app.use()` not `app.all('*')`

**Health checks failing**
- Check MongoDB connection string
- Verify environment variables set
- Check container logs in Coolify

**SSL certificate errors**
- Wait 5-10 minutes for Let's Encrypt
- Verify DNS A record pointing to server IP
- Check ports 80/443 open on server

### Database Connection Failed

1. Verify connection string format
2. Check MongoDB Atlas IP whitelist (`0.0.0.0/0`)
3. Test connection locally first

### Application Logs

View in Coolify:
- Dashboard → Select app → Logs tab

Or via SSH:
```bash
docker logs -f <container-name>
```

## Complete Guides

- **Deployment:** [deployment.md](./deployment.md)
- **MongoDB:** [mongodb-atlas-setup.md](./mongodb-atlas-setup.md)
- **Troubleshooting:** [troubleshooting-log.md](./troubleshooting-log.md)
- **Express 5 Issues:** [deployment-issue-log.md](./deployment-issue-log.md)

## Post-Deployment

### Enable On-Demand Revalidation

See [odr-readme.md](./odr-readme.md):
```bash
# Already configured in code
# Just verify environment variables set
REVALIDATE_SECRET=<your-secret>
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

### Set Up Monitoring

1. Check health endpoint regularly
2. Monitor Coolify dashboard
3. Set up uptime monitoring (optional)

### Backups

- **Database:** MongoDB Atlas auto-snapshots (daily)
- **Code:** Git repository
- **Media:** Mount persistent volume in Coolify

## Quick Reference

| Step | Command/Action |
|------|----------------|
| Generate secret | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| Test health | `curl https://yourdomain.com/health` |
| View logs | Coolify Dashboard → Logs |
| Restart app | Coolify Dashboard → Restart button |
| Redeploy | Coolify Dashboard → Deploy button |

## Estimated Time

- MongoDB setup: 10 minutes
- Coolify configuration: 15 minutes
- First deployment: 5-10 minutes
- DNS propagation: 5-60 minutes
- Total: ~30-60 minutes

## Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string works
- [ ] Environment variables configured in Coolify
- [ ] Domain DNS pointing to server
- [ ] Application deployed successfully
- [ ] Health endpoint returns 200
- [ ] Frontend loads correctly
- [ ] Admin panel accessible
- [ ] SSL certificate active
- [ ] Can create/edit content

## Next Steps

1. Customize branding in admin panel
2. Create pages and content
3. Configure On-Demand Revalidation
4. Set up analytics (optional)
5. Configure custom 404 page

## Related Documentation

- **Full Deployment Guide**: [deployment.md](./deployment.md)
- **MongoDB Setup**: [mongodb-atlas-setup.md](./mongodb-atlas-setup.md)
- **Deployment Issues**: [deployment-issue-log.md](./deployment-issue-log.md)
- **Troubleshooting**: [troubleshooting-log.md](./troubleshooting-log.md)
- **All Docs**: [index.md](./index.md)
