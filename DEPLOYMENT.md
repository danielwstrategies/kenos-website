# Cloudways Deployment Guide

This guide walks you through deploying your Payload CMS website to Cloudways.

## Prerequisites

1. **Cloudways Account** - Sign up at https://www.cloudways.com
2. **MongoDB Atlas** (recommended for production) - Free tier at https://www.mongodb.com/cloud/atlas

## Step 1: Set up MongoDB Atlas

1. Create a MongoDB Atlas account and cluster
2. Go to "Database Access" → Create a database user
3. Go to "Network Access" → Add your Cloudways server IP (you'll get this after Step 2)
4. Get your connection string from "Connect" → "Connect your application"
5. It will look like: `mongodb+srv://username:password@cluster.mongodb.net/kenos-website`

## Step 2: Create Cloudways Server

1. Log into Cloudways dashboard
2. Click "Add Server"
3. Select:
   - **Provider**: DigitalOcean, AWS, or Google Cloud
   - **Application**: Node.js
   - **Server Size**: Start with 1GB RAM (you can scale later)
   - **Location**: Choose closest to your users
4. Launch server

## Step 3: Configure Server Environment

SSH into your Cloudways server or use their web terminal:

```bash
# Navigate to your application
cd /home/master/applications/[your-app-id]/public_html

# Create environment file
nano .env
```

Add your production environment variables:

```bash
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/kenos-website
PAYLOAD_SECRET=generate-a-secure-random-string-here
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
PORT=3000
NODE_ENV=production
```

**Generate a secure PAYLOAD_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Deploy Your Code

### Option A: Git Deployment (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. In Cloudways:
   - Go to "Deployment via Git"
   - Add your repository
   - Set branch to `main`
   - Set deployment path to `/public_html`

### Option B: Manual Upload

1. Zip your project (excluding node_modules, dist, .env)
2. Upload via Cloudways SFTP/SSH
3. Extract in `/home/master/applications/[your-app-id]/public_html`

## Step 5: Install Dependencies & Build

SSH into your server:

```bash
cd /home/master/applications/[your-app-id]/public_html

# Install Node.js 20 (if not already)
nvm install 20
nvm use 20

# Install dependencies
npm install

# Build the application
npm run deploy:build
```

## Step 6: Configure PM2 (Process Manager)

```bash
# Start the application with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup
```

## Step 7: Configure Nginx (Cloudways handles this)

Cloudways automatically configures Nginx, but verify:

1. Go to Application Settings
2. Set Port to `3000`
3. Enable HTTPS/SSL certificate (Let's Encrypt - free)

## Step 8: Domain Setup

1. In Cloudways, go to "Domain Management"
2. Add your domain
3. Update DNS records with your domain registrar:
   - A Record: Point to Cloudways server IP
   - Wait for DNS propagation (up to 48 hours)

## Step 9: Test Your Deployment

1. Visit `https://yourdomain.com/health` - Should return `{"status":"ok"}`
2. Visit `https://yourdomain.com/admin` - Should show Payload CMS login
3. Create your first admin user

## Monitoring & Maintenance

### PM2 Commands
```bash
pm2 status              # Check application status
pm2 logs kenos-website  # View logs
pm2 restart all         # Restart application
pm2 stop all            # Stop application
```

### Update Deployment
```bash
git pull origin main    # Pull latest changes
npm install             # Install new dependencies
npm run deploy:build    # Rebuild
pm2 restart all         # Restart application
```

### Cloudways Features to Use
- **Auto-backups**: Enable daily backups
- **Monitoring**: Check server health, CPU, memory
- **Auto-healing**: Automatically restart if app crashes
- **Staging**: Create a staging environment for testing

## Troubleshooting

### Application won't start
```bash
pm2 logs kenos-website  # Check logs for errors
```

Common issues:
- Wrong `DATABASE_URI` format
- Missing environment variables
- Port 3000 not available
- MongoDB connection issues

### Can't connect to MongoDB Atlas
- Whitelist Cloudways server IP in MongoDB Atlas "Network Access"
- Check connection string format
- Verify database user credentials

### SSL/HTTPS Issues
- Enable SSL certificate in Cloudways Application Settings
- Force HTTPS redirect in Cloudways

## Performance Optimization

1. **Enable Redis** (Cloudways add-on) for caching
2. **CDN**: Use Cloudflare for static assets
3. **Image Optimization**: Use Cloudways image optimization
4. **Monitoring**: Set up New Relic or Cloudways monitoring

## Costs Estimate

- **Cloudways**: ~$12-26/month (1-2GB server)
- **MongoDB Atlas**: Free tier (512MB) or ~$9/month (2GB shared)
- **Domain**: ~$12/year
- **Total**: ~$15-35/month

## Security Best Practices

1. Change default SSH port in Cloudways
2. Use strong PAYLOAD_SECRET
3. Enable 2FA on Cloudways account
4. Whitelist IPs for MongoDB Atlas
5. Regular backups
6. Keep dependencies updated: `npm audit fix`
