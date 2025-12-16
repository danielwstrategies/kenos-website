import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const pages = await payload.find({
      collection: 'pages',
      limit: 100,
    })

    const pageList = pages.docs.map((page: any) => ({
      id: page.id,
      title: page.title,
      slug: page.slug,
      blockTypes: page.layout?.map((block: any) => block.blockType) || [],
    }))

    return NextResponse.json({
      totalPages: pages.totalDocs,
      pages: pageList,
    })
  } catch (error) {
    console.error('Error listing pages:', error)
    return NextResponse.json(
      { error: 'Failed to list pages', details: String(error) },
      { status: 500 }
    )
  }
}

