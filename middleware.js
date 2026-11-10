import { NextResponse } from 'next/server'

export function middleware(request) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase()

  // Si la petición viene de un bot de vista previa de redes sociales (WhatsApp, Facebook, Telegram, Twitter)
  const isSocialBot =
    userAgent.includes('whatsapp') ||
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('facebot') ||
    userAgent.includes('telegrambot') ||
    userAgent.includes('twitterbot')

  if (isSocialBot) {
    // Retornar 404 para que no genere ninguna tarjeta de vista previa ni imágenes
    return new Response(null, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

