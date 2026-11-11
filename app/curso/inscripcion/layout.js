export const metadata = {
  title: 'Fundambiente | Inscripción al Curso',
  description: 'Curso Teórico-Práctico: Reconocimiento, registro y manejo sostenible de bambú en ABRAEs de Venezuela - 2da Cohorte.',
  openGraph: {
    title: 'Fundambiente | Inscripción al Curso',
    description: 'Curso Teórico-Práctico: Reconocimiento, registro y manejo sostenible de bambú en ABRAEs de Venezuela - 2da Cohorte.',
    url: 'https://formulario-fundambiente.vercel.app/curso/inscripcion',
    siteName: 'Fundambiente',
    images: [
      {
        url: '/banner-2da-cohorte.jpg',
        alt: 'Curso Teórico-Práctico Bambú en ABRAEs - 2da Cohorte',
      },
    ],
    locale: 'es_VE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundambiente | Inscripción al Curso',
    description: 'Curso Teórico-Práctico: Reconocimiento, registro y manejo sostenible de bambú en ABRAEs de Venezuela - 2da Cohorte.',
    images: ['/banner-2da-cohorte.jpg'],
  },
}

export default function CursoLayout({ children }) {
  return <>{children}</>
}
