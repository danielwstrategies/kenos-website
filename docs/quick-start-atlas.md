# Quick Start: MongoDB Atlas Setup

Get your Kenos Website connected to MongoDB Atlas in 5 minutes.

## ⚡ Fast Track

### 1. Create MongoDB Atlas Account & Cluster (3 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free) or sign in
3. Click **"Build a Database"**
4. Choose **M0 FREE** tier
5. Select your preferred region
6. Click **"Create Cluster"** (wait 3-5 minutes)

### 2. Create Database User (1 minute)

1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Username: `kenos-admin` (or your choice)
4. Click **"Autogenerate Secure Password"**
5. **COPY AND SAVE THE PASSWORD!** 🔑
6. Set privileges to **"Read and write to any database"**
7. Click **"Add User"**

### 3. Whitelist Your IP (30 seconds)

1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Click **"Confirm"**

### 4. Get Connection String (30 seconds)

1. Go to **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**, Version: **6.0 or later**
5. **COPY** the connection string

### 5. Update .env File (1 minute)

Edit your `.env` file:

```env
DATABASE_URI=mongodb+srv://kenos-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kenos-website?retryWrites=true&w=majority
PAYLOAD_SECRET=generate-a-random-secret-here
PORT=3011
```

**Important**: 
- Replace `YOUR_PASSWORD` with the password you saved
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL
- Add `/kenos-website` after `.net` to specify database name

Generate a secure PAYLOAD_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 6. Test Connection (30 seconds)

```bash
npm run test:db
```

You should see: ✅ All tests passed!

### 7. Start Your App

```bash
npm run dev
```

Visit: **http://localhost:3011/admin**

## 🎉 Done!

Create your first admin user and start building!

## ⚠️ Troubleshooting

**"Authentication failed"**
- Double-check username and password in DATABASE_URI
- URL-encode special characters in password (@ → %40, # → %23)

**"Connection timeout"**
- Verify your IP is whitelisted in Network Access
- Check your internet connection

**"Invalid connection string"**
- Make sure it starts with `mongodb+srv://`
- Verify you replaced `<username>`, `<password>`, and `<cluster-url>`
- Add `/kenos-website` after the cluster URL

## 📚 Full Documentation

See `mongodb-atlas-setup.md` for detailed setup guide.

## 🔒 Security Reminders

- ✅ `.env` is in `.gitignore` - never commit it!
- ✅ Use strong passwords
- ✅ For production: whitelist specific IPs only
- ✅ Rotate secrets regularly

---

**Next Steps:**
1. Create admin user at `/admin`
2. Upload media (images, photos)
3. Create your homepage in Pages collection
4. Build frontend components
5. Deploy! 🚀
## Related Documentation

- **Full MongoDB Guide**: [mongodb-atlas-setup.md](./mongodb-atlas-setup.md)
- **Quick Start**: [setup.md](./setup.md)
- **Deployment**: [deployment-quickstart.md](./deployment-quickstart.md)
- **All Docs**: [index.md](./index.md)
