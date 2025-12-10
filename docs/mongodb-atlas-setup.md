# MongoDB Atlas Setup Guide

This guide will walk you through setting up MongoDB Atlas for your Kenos Website project.

## Step 1: Create a MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" or "Sign In" if you already have an account
3. Create a new account or sign in with Google/GitHub

## Step 2: Create a New Cluster

1. After logging in, click "Build a Database" (or "Create" if you have existing clusters)
2. Choose a deployment option:
   - **M0 (Free Tier)** - Perfect for development and small projects
   - Select your preferred cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region closest to your users for better performance
3. Click "Create Cluster" (this may take 3-5 minutes)

## Step 3: Configure Database Access

### Create a Database User

1. In the left sidebar, click "Database Access" under "Security"
2. Click "Add New Database User"
3. Choose "Password" as the authentication method
4. Set a username (e.g., `kenos-admin`)
5. Click "Autogenerate Secure Password" or create your own
   - **IMPORTANT**: Copy and save this password securely!
6. Under "Database User Privileges", select "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access

1. In the left sidebar, click "Network Access" under "Security"
2. Click "Add IP Address"
3. For development, you can:
   - Click "Allow Access from Anywhere" (0.0.0.0/0) - easier for development
   - OR click "Add Current IP Address" - more secure
   - For production, add your specific server IP addresses
4. Click "Confirm"

## Step 5: Get Your Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Choose:
   - **Driver**: Node.js
   - **Version**: 6.0 or later
5. Copy the connection string - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

1. Open the `.env` file in your project root
2. Replace the `DATABASE_URI` value with your connection string
3. Make sure to:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password (the one you saved earlier)
   - Add `/kenos-website` after `.net` to specify the database name

Your `.env` should look like this:

```env
# MongoDB Atlas Connection
DATABASE_URI=mongodb+srv://kenos-admin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/kenos-website?retryWrites=true&w=majority

# Payload Secret - Change this to a random string
PAYLOAD_SECRET=your-secret-key-change-this-in-production

# Port
PORT=3011
```

### Generate a Secure PAYLOAD_SECRET

For production, generate a secure random string:

```bash
# On macOS/Linux
openssl rand -base64 32

# Or in Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Step 7: Test Your Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. You should see output indicating successful connection to MongoDB Atlas

3. Visit `http://localhost:3011/admin` to access the Payload admin panel

4. Create your first admin user when prompted

## Step 8: Verify Database in Atlas

1. Go back to MongoDB Atlas dashboard
2. Click "Browse Collections" on your cluster
3. You should see a new database called `kenos-website` with collections like:
   - `users`
   - `pages`
   - `media`
   - `payload-preferences`

## Troubleshooting

### Connection Timeout

- **Issue**: `MongoServerSelectionError: connection timeout`
- **Solution**: Check your Network Access settings in Atlas. Make sure your IP address is whitelisted.

### Authentication Failed

- **Issue**: `MongoServerError: Authentication failed`
- **Solution**: 
  - Verify your username and password in the connection string
  - Make sure there are no special characters that need URL encoding in your password
  - If your password contains special characters like `@`, `#`, `$`, encode them:
    - `@` → `%40`
    - `#` → `%23`
    - `$` → `%24`

### Database User Privileges

- **Issue**: Can't write to database
- **Solution**: Ensure your database user has "Read and write to any database" privileges

### Connection String Format

Make sure your connection string follows this format exactly:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER-URL/DATABASE-NAME?retryWrites=true&w=majority
```

## Security Best Practices

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong passwords** - Use MongoDB's autogenerate feature
3. **Rotate secrets regularly** - Change PAYLOAD_SECRET and database passwords periodically
4. **Limit IP access** - In production, only whitelist specific IP addresses
5. **Use environment variables** - Never hardcode credentials in your code
6. **Enable audit logs** - Available in MongoDB Atlas M10+ clusters

## Next Steps

After successfully connecting to MongoDB Atlas:

1. ✅ Create your first admin user at `/admin`
2. 📸 Upload images to the Media collection
3. 📝 Create your homepage in the Pages collection
4. 🎨 Build frontend components to render your content
5. 🚀 Deploy your application

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)
- [MongoDB Atlas Free Tier Limits](https://www.mongodb.com/pricing)

## Support

If you encounter issues:
- Check MongoDB Atlas status: https://status.mongodb.com/
- Payload CMS Discord: https://discord.com/invite/payload
- MongoDB Community: https://www.mongodb.com/community/forums/
## Related Documentation

- **Quick Start**: [quick-start-atlas.md](./quick-start-atlas.md)
- **Deployment**: [deployment-quickstart.md](./deployment-quickstart.md)
- **Troubleshooting**: [troubleshooting-log.md](./troubleshooting-log.md)
- **All Docs**: [index.md](./index.md)
