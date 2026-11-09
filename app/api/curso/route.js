import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Server-side validation
    if (!data.nombre || !data.apellido || !data.cedula || !data.email) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const nuevoRegistro = await prisma.inscripcionCurso.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        cedula: data.cedula,
        genero: data.genero,
        edad: data.edad ? parseInt(data.edad, 10) : null,
        fechaNacimiento: data.fechaNacimiento,
        telefono: data.telefono,
        estado: data.estado,
        municipio: data.municipio,
        parroquia: data.parroquia,
        institucion: data.institucion,
        gradoAcademico: data.gradoAcademico,
        rolDesempeno: data.rolDesempeno,
        email: data.email,
      }
    })

    return NextResponse.json({ success: true, registro: nuevoRegistro }, { status: 201 })
  } catch (error) {
    console.error('Error guardando pre-registro:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Esta cédula ya ha sido registrada.' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Hubo un error procesando el registro' },
      { status: 500 }
    )
  }
}
