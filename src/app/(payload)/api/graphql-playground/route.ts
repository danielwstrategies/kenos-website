/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* SECURITY: Disabled in production - only available in development */
import config from '@/payload.config'
import { GRAPHQL_PLAYGROUND_GET } from '@payloadcms/next/routes'
import { NextResponse } from 'next/server'

const playgroundHandler = GRAPHQL_PLAYGROUND_GET(config)

export const GET = process.env.NODE_ENV === 'production'
  ? () => NextResponse.json({ error: 'GraphQL Playground is disabled in production' }, { status: 403 })
  : playgroundHandler
