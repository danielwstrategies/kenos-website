# Kenos Website - Payload CMS

A Payload CMS website ready to be customized based on your Figma design.

## Getting Started

### Prerequisites

- Node.js v18+ installed
- MongoDB running locally or connection string to MongoDB Atlas

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Configuration

1. Update `.env` file with your MongoDB connection:
   ```
   DATABASE_URI=mongodb://localhost:27017/kenos-website
   PAYLOAD_SECRET=your-secret-key-change-this-in-production
   PORT=3000
   ```

### Running the Development Server

```bash
npm run dev
```

The admin panel will be available at: `http://localhost:3000/admin`

### Project Structure

```
.
├── src/
│   ├── collections/     # Content collections (Pages, Users, etc.)
│   ├── globals/         # Global settings
│   ├── payload.config.ts # Payload configuration
│   └── server.ts        # Express server
├── public/              # Static assets
└── .env                 # Environment variables
```

## Next Steps

1. **Set up MongoDB** - Install MongoDB locally or use MongoDB Atlas
2. **Add Figma design assets** - Export images, fonts, and other assets to `/public`
3. **Create custom collections** - Add collections based on your Figma components
4. **Build the frontend** - Consider using Next.js for the frontend

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run generate:types` - Generate TypeScript types from collections
