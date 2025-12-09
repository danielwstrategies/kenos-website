import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'
import Users from './collections/Users'
import TestCollection from './collections/TestCollection'
import Pages from './collections/Pages'
import Media from './collections/Media'
import Services from './collections/Services'
import ContactSubmissions from './collections/ContactSubmissions'
import Navigation from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-this',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/kenos-website',
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
})
