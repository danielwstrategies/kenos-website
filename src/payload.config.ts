import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import sharp from 'sharp'
import Users from './collections/Users'
import TestCollection from './collections/TestCollection'
import Pages from './collections/Pages'
import Media from './collections/Media'
import Services from './collections/Services'
import ContactSubmissions from './collections/ContactSubmissions'
import Navigation from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Ensure dotenv is loaded before accessing env vars
dotenv.config({ path: path.resolve(dirname, '../.env') })

const databaseUri = process.env.DATABASE_URI
if (!databaseUri) {
  throw new Error('DATABASE_URI environment variable is not set')
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
  db: mongooseAdapter({
    url: databaseUri,
  }),
  editor: slateEditor({}),
  admin: {
    user: 'users',
    theme: 'light',
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
    TestCollection,
  ],
  globals: [
    Navigation,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
})
