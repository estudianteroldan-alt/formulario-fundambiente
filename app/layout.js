import './globals.css'

export const metadata = {
  title: 'Fundambiente | Inscripciones',
  description: 'Sistema de registro para los cursos de la Fundación de Educación Ambiental',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
