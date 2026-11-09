import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo') || 'curso'

    let registros = []
    if (tipo === 'webinar') {
      registros = await prisma.inscripcionWebinar.findMany({
        orderBy: { creadoEn: 'desc' }
      })
    } else {
      registros = await prisma.inscripcionCurso.findMany({
        orderBy: { creadoEn: 'desc' }
      })
    }
    
    return NextResponse.json({ registros })
  } catch (error) {
    console.error('Error obteniendo registros:', error)
    const envStatus = process.env.DATABASE_URL 
      ? `Present (starts with: ${process.env.DATABASE_URL.substring(0, 8)})` 
      : 'NOT_FOUND_OR_EMPTY'
    return NextResponse.json(
      { error: 'Hubo un error obteniendo los datos', details: error.message, envStatus },
      { status: 500 }
    )
  }
}
