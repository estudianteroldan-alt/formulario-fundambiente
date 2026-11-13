'use client'

import { useState, useEffect } from 'react'

const ESTADOS_VENEZUELA = [
  'Amazonas',
  'Anzoátegui',
  'Apure',
  'Aragua',
  'Barinas',
  'Bolívar',
  'Carabobo',
  'Cojedes',
  'Delta Amacuro',
  'Dependencias Federales',
  'Distrito Capital',
  'Falcón',
  'Guárico',
  'La Guaira',
  'Lara',
  'Mérida',
  'Miranda',
  'Monagas',
  'Nueva Esparta',
  'Portuguesa',
  'Sucre',
  'Táchira',
  'Trujillo',
  'Yaracuy',
  'Zulia'
]

const CAROUSEL_DATA = [
  { image: '/banner.jpg', title: 'Manejo Sostenible del Bambú', desc: 'Aprende a identificar y gestionar de manera sostenible este recurso vital en Venezuela.' },
  { image: '/tepuy.jpg', title: 'Áreas Bajo Régimen de Administración Especial', desc: 'Enfocado en Parques Nacionales, Monumentos Naturales y Reservas Forestales del territorio nacional.' },
  { image: '/rainforest.jpg', title: 'Biodiversidad y Conservación', desc: 'Comprende el marco de gobernanza global (INBAR) y protege los servicios ecosistémicos.' },
  { image: '/roraima-1.jpg', title: 'Paisajes Ancestrales', desc: 'Conoce los ecosistemas milenarios del Escudo Guayanés.' },
  { image: '/roraima-2.jpg', title: 'Conservación Activa', desc: 'Estrategias de preservación en la Gran Sabana.' },
  { image: '/roraima-3.jpg', title: 'Ecosistemas Frágiles', desc: 'Protección de especies endémicas y formaciones geológicas únicas.' },
  { image: '/roraima-4.jpg', title: 'Patrimonio Natural', desc: 'El valor incalculable de nuestras reservas y parques nacionales.' }
]

const ScheduleBox = ({ className }) => (
  <div className={className} style={{
    backdropFilter: 'blur(10px)',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    maxHeight: '88vh',
    overflowY: 'auto'
  }}>
    <h3 style={{ color: 'var(--primary)', marginBottom: '0.4rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', fontSize: '1.15rem' }}>
      Módulos del Curso - Segunda Cohorte
    </h3>
    <p style={{ fontSize: '0.82rem', color: 'var(--primary)', marginBottom: '0.8rem', fontWeight: 'bold' }}>
      🗓️ 18 de noviembre de 2026 al 13 de enero de 2027
    </p>
    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <li>
        <strong>18 de noviembre de 2026 (9:00 am – 11:00 am | En línea)</strong><br />
        Sesión 1: Morfología y diversidad de especies.
      </li>
      <li>
        <strong>25 de noviembre de 2026 (9:00 am – 11:00 am | En línea)</strong><br />
        Sesión 2: Del sismo a la norma. La reconstrucción con bambú. Experiencias latinoamericanas en sismorresistencia, cuencas y ambiente.
      </li>
      <li>
        <strong>02 de diciembre de 2026 (9:00 am – 11:00 am | En línea)</strong><br />
        Sesión 3: Valor Ecológico y Gestión Sostenible.
      </li>
      <li>
        <strong>09 de diciembre de 2026 (9:00 am – 11:00 am | En línea)</strong><br />
        Sesión 4: Inducción para registro de bambúes en Áreas Bajo Régimen de Administración Especial (ABRAE).
      </li>
      <li style={{ padding: '0.5rem 0.8rem', backgroundColor: 'rgba(0, 128, 76, 0.1)', borderRadius: '6px', borderLeft: '3px solid var(--primary)' }}>
        <strong>📅 ENTREGA DE FICHAS:</strong> Lunes 04 de enero de 2027
      </li>
      <li>
        <strong>06 de enero de 2027 (9:00 am – 3:00 pm | En línea)</strong><br />
        Sesión 5: Taller de poda, mantenimiento y propagación de bambú.
      </li>
      <li>
        <strong>13 de enero de 2027 (9:00 am – 3:00 pm | En línea)</strong><br />
        Sesión 6: Consolidación, resultados y cierre.
      </li>
    </ul>
    <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: 'rgba(249, 129, 13, 0.12)', borderRadius: '8px', fontSize: '0.8rem', borderLeft: '3px solid var(--accent)', lineHeight: '1.4' }}>
      📌 <strong>Nota Importante - Práctica de campo territorial:</strong> Como actividad de aplicación, cada participante realizará en su territorio el registro de una especie de bambú, siguiendo la ficha de registro y las orientaciones de documentación fotográfica incluidas en este curso.
    </div>
  </div>
)

export default function CursoInscripcion() {
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', cedula: '', genero: '', edad: '', fechaNacimiento: '',
    telefono: '', estado: '', municipio: '', parroquia: '',
    institucion: '', gradoAcademico: '', rolDesempeno: '', email: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_DATA.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  // Solo permite dígitos en campos numéricos
  const handleNumericInput = (e) => {
    const { name, value } = e.target
    const soloNumeros = value.replace(/\D/g, '')
    setFormData({ ...formData, [name]: soloNumeros })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/curso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (res.ok) {
        setShowSuccessModal(true)
        setFormData({
          nombre: '', apellido: '', cedula: '', genero: '', edad: '', fechaNacimiento: '',
          telefono: '', estado: '', municipio: '', parroquia: '',
          institucion: '', gradoAcademico: '', rolDesempeno: '', email: ''
        })
      } else {
        setMessage(data.error || 'Ocurrió un error al enviar.')
      }
    } catch (err) {
      setMessage('Error de red. Inténtalo de nuevo.')
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>

      {/* Columna Izquierda: Formulario */}
      <div className="form-column" style={{ flex: '1.2', display: 'flex', flexDirection: 'column', padding: '2rem 4rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src="/logo.png" alt="Fundambiente Logo" style={{ maxWidth: '280px', width: '100%', height: 'auto', marginBottom: '1.2rem' }} />
            <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Formulario de Inscripción</h1>
            <div style={{ fontSize: '0.9rem', opacity: 0.9, textAlign: 'justify', lineHeight: '1.5', marginTop: '1rem', padding: '0 1rem' }}>
              <p style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 'bold' }}>
                CURSO TEÓRICO-PRÁCTICO
              </p>
              <h2 style={{ textAlign: 'center', marginBottom: '0.8rem', fontSize: '1.15rem', color: 'var(--primary)', lineHeight: '1.4' }}>
                Reconocimiento, registro y manejo sostenible de bambú en ABRAEs (Áreas bajo régimen de administración especial) de Venezuela
              </h2>
              <div style={{ textAlign: 'center', margin: '0.8rem 0', padding: '0.6rem 1rem', background: 'rgba(0, 128, 76, 0.08)', borderRadius: '8px' }}>
                <p style={{ fontWeight: 'bold', color: 'var(--primary)', margin: 0, fontSize: '0.95rem' }}>
                  📅 Segunda cohorte: 18 de noviembre de 2026 hasta el 13 de enero de 2027
                </p>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.88rem', fontStyle: 'italic', opacity: 0.9 }}>
                  Dictado por: MgSc. Arq° Mercedes María Medina Gamboa
                </p>
              </div>

              <p style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                Capacitar a los participantes en la identificación, manejo sostenible y registro institucional de las especies de bambú en ABRAEs de Venezuela, integrando bases conceptuales en línea con una jornada de práctica de campo.
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            {message && !showSuccessModal && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: 'rgba(249, 129, 13, 0.2)',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label>Nombre</label>
                  <input name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Apellido</label>
                  <input name="apellido" value={formData.apellido} onChange={handleChange} required />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 30%' }}>
                  <label>Cédula de Identidad</label>
                  <input
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleNumericInput}
                    inputMode="numeric"
                    pattern="[0-9]+"
                    maxLength={9}
                    placeholder="Ej: 11586995"
                    title="Solo números, sin puntos ni letras"
                    required
                  />
                </div>
                <div style={{ flex: '1 1 30%' }}>
                  <label>Género</label>
                  <select name="genero" value={formData.genero} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label>Fecha de Nacimiento</label>
                  <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Edad</label>
                  <input type="number" name="edad" value={formData.edad} onChange={handleChange} min="1" max="120" required />
                </div>
              </div>

              <div>
                <label>Número de Contacto</label>
                <input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleNumericInput}
                  inputMode="numeric"
                  pattern="[0-9]+"
                  maxLength={11}
                  placeholder="Ej: 04121234567"
                  title="Solo números, sin guiones ni espacios (11 dígitos)"
                  required
                />
              </div>
              <div>
                <label>Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 30%' }}>
                  <label>Estado</label>
                  <select name="estado" value={formData.estado} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    {ESTADOS_VENEZUELA.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: '1 1 30%' }}>
                  <label>Municipio</label>
                  <input name="municipio" value={formData.municipio} onChange={handleChange} required />
                </div>
                <div style={{ flex: '1 1 30%' }}>
                  <label>Parroquia</label>
                  <input name="parroquia" value={formData.parroquia} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <label>Institución / Organización / Comunidad</label>
                <input name="institucion" value={formData.institucion} onChange={handleChange} required />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <label>Grado académico alcanzado</label>
                  <input name="gradoAcademico" value={formData.gradoAcademico} onChange={handleChange} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Rol o área de desempeño</label>
                  <input name="rolDesempeno" value={formData.rolDesempeno} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '1.5rem', padding: '16px' }}>
                {loading ? 'Enviando...' : 'Enviar Inscripción'}
              </button>
            </form>
          </div>

          <ScheduleBox className="mobile-schedule" />

        </div>
      </div>

      {/* Columna Derecha: Carrusel (Fondo en móviles) */}
      <div style={{ flex: '1', position: 'relative', overflow: 'hidden' }} className="carousel-container">
        {CAROUSEL_DATA.map((slide, idx) => (
          <div key={idx} style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentSlide === idx ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '4rem 3rem',
            boxShadow: 'inset 120px -100px 150px -50px var(--background)'
          }}>
            <div style={{
              background: 'rgba(0, 31, 63, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '1.5rem',
              borderRadius: '16px',
              color: 'white',
              maxWidth: '60%',
              transform: currentSlide === idx ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1s ease-in-out',
              transitionDelay: '0.3s'
            }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-first-spring)' }}>{slide.title}</h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.4' }}>{slide.desc}</p>
            </div>
          </div>
        ))}

        <ScheduleBox className="desktop-schedule" />
      </div>

      {/* Modal de Éxito y Telegram */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'var(--surface)', padding: '3rem', borderRadius: '16px',
            maxWidth: '500px', width: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '2rem' }}>¡Inscripción Exitosa! 🎉</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              Tus datos han sido registrados correctamente. Para continuar y no perderte ninguna novedad, <strong>es obligatorio unirse a nuestro grupo oficial.</strong>
            </p>
            <a
              href="https://t.me/cursoABRAESVENEZUELA"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowSuccessModal(false)}
              style={{
                display: 'inline-block', backgroundColor: '#0088cc', color: 'white', padding: '16px 32px',
                borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', fontSize: '1.2rem',
                boxShadow: '0 4px 15px rgba(0, 136, 204, 0.4)', transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Únete al Grupo de Telegram ✈️
            </a>
            <div style={{ marginTop: '1.5rem' }}>
              <button onClick={() => setShowSuccessModal(false)} style={{ background: 'transparent', border: 'none', color: 'gray', textDecoration: 'underline', cursor: 'pointer' }}>
                Cerrar ventana
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .form-column {
          background-color: var(--background);
        }
        .desktop-schedule {
          position: absolute;
          top: 2rem;
          right: 2rem;
          max-width: 450px;
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.95);
          color: #222;
        }
        .mobile-schedule {
          display: none;
          margin-top: 2.5rem;
          background-color: rgba(255, 255, 255, 0.8);
          color: #222;
        }
        @media (max-width: 900px) {
          .carousel-container { 
            position: fixed !important;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            z-index: -1;
          }
          .form-column {
            background-color: rgba(255, 255, 255, 0.6) !important;
            backdrop-filter: blur(4px);
            padding: 2rem 1rem !important;
          }
          .desktop-schedule {
            display: none;
          }
          .mobile-schedule {
            display: block;
          }
        }
        @media (prefers-color-scheme: dark) {
          .desktop-schedule, .mobile-schedule {
            background-color: rgba(0, 31, 63, 0.85) !important;
            color: #fff !important;
          }
        }
        @media (prefers-color-scheme: dark) and (max-width: 900px) {
          .form-column {
            background-color: rgba(0, 0, 0, 0.65) !important;
          }
        }
      `}} />

    </div>
  )
}
