import './globals.css'

export const metadata = {
  title: 'Fundambiente',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
