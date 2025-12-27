import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import sharp from 'sharp'
import Users from './collections/Users'
import Pages from './collections/Pages'
import Media from './collections/Media'
import Services from './collections/Services'
import ContactSubmissions from './collections/ContactSubmissions'
import BlogPosts from './collections/BlogPosts'
import Navigation from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Ensure dotenv is loaded before accessing env vars
dotenv.config({ path: path.resolve(dirname, '../.env') })

const databaseUri = process.env.DATABASE_URI
if (!databaseUri) {
  throw new Error('DATABASE_URI environment variable is not set')
}

const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is not set')
}

export default buildConfig({
  secret: payloadSecret,
  db: mongooseAdapter({
    url: databaseUri,
  }),
  editor: slateEditor({}),
  admin: {
    user: 'users',
    theme: 'dark',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Pages,
    Media,
    Services,
    ContactSubmissions,
    BlogPosts,
  ],
  globals: [
    Navigation,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
})
