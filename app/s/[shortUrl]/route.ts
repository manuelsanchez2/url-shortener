import { MemoryCache } from '@/lib/memoryCache'
import Url from '@/lib/models/url.model'
import UserUrl from '@/lib/models/user-url.model'
import { connectToDB } from '@/lib/mongoose'
import { NextRequest, NextResponse } from 'next/server'

async function handleAnalytics(urlId: string): Promise<void> {
  try {
    console.log(`Procesando análisis para la URL: ${urlId}`)
    await UserUrl.findOneAndUpdate(
      { url: urlId },
      { $inc: { clickCounter: 1 }, lastClickDate: Date.now() }
    )
    console.log(`Análisis completado para la URL: ${urlId}`)
  } catch (error: any) {
    console.error('handleAnalytics', error.message)
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  connectToDB()
  const shortUrl = params.shortUrl
  const host = 'https://msweb-link.vercel.app/'

  if (!shortUrl) {
    if (host) {
      return NextResponse.redirect(host)
    }
  }

  const cacheItem = MemoryCache.getItemValue(shortUrl)
  if (cacheItem) {
    return NextResponse.redirect(cacheItem)
  }

  try {
    const getLongUrl = await Url.findOne({ shortUrl: shortUrl })

    if (!getLongUrl) {
      if (host) {
        return NextResponse.redirect(host)
      }
    }

    // Redireccionar a la URL larga
    const longUrl = getLongUrl.longUrl
    const response = NextResponse.redirect(longUrl)

    // Procesar análisis de manera asíncrona
    handleAnalytics(getLongUrl.id).catch((error) => {
      console.error(`Error al procesar análisis para la URL: ${longUrl}`, error)
    })

    MemoryCache.setItem(shortUrl, longUrl)

    return response
  } catch (error: any) {
    console.error('error while getting the longurl', error.message)
    return NextResponse.redirect(host)
  }
}
