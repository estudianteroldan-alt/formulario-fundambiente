import './globals.css'

export const metadata = {
  metadataBase: new URL('https://formulario-fundambiente.vercel.app'),
  title: 'Fundambiente',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
