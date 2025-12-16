import { getPayload } from 'payload'
import { NextResponse } from 'next/server'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Fetch the history page to get the kenosToday block
    const historyPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'history',
        },
      },
      depth: 2,
    })

    const historyPage = historyPages.docs[0]

    if (!historyPage) {
      return NextResponse.json({ error: 'History page not found' }, { status: 404 })
    }

    // Find the kenosToday block in the history page
    const kenosTodayBlock = historyPage.layout?.find(
      (block: any) => block.blockType === 'kenosToday'
    ) as any

    if (!kenosTodayBlock) {
      return NextResponse.json({ error: 'Kenos Today block not found in history page' }, { status: 404 })
    }

    // Fetch the our-staff page
    const staffPages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'our-staff',
        },
      },
      depth: 2,
    })

    const staffPage = staffPages.docs[0]

    if (!staffPage) {
      return NextResponse.json({ error: 'Our Staff page not found' }, { status: 404 })
    }

    // Find and update the kenosToday block in the staff page layout
    const updatedLayout = staffPage.layout?.map((block: any) => {
      if (block.blockType === 'kenosToday') {
        // Copy the kenosToday block from history, but generate a new ID
        return {
          ...kenosTodayBlock,
          id: undefined, // Let Payload generate a new ID
        }
      }
      return block
    })

    // Update the our-staff page with the new layout
    const updatedPage = await payload.update({
      collection: 'pages',
      id: staffPage.id,
      data: {
        layout: updatedLayout,
      },
    })

    return NextResponse.json({
      message: 'Kenos Today section copied from history page to our-staff page!',
      kenosTodayBlock: {
        logo: kenosTodayBlock.logo?.id || kenosTodayBlock.logo,
        backgroundImage: kenosTodayBlock.backgroundImage?.id || kenosTodayBlock.backgroundImage,
        galleryCount: kenosTodayBlock.gallery?.length || 0,
      },
      updatedPage: updatedPage.id,
    })
  } catch (error) {
    console.error('Error copying Kenos Today section:', error)
    return NextResponse.json(
      { error: 'Failed to copy Kenos Today section', details: String(error) },
      { status: 500 }
    )
  }
}

