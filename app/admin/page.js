'use client'

import React, { useState, useEffect, useMemo } from 'react'
import * as XLSX from 'xlsx-js-style'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [registros, setRegistros] = useState([])
  const [loading, setLoading] = useState(false)
  const [expandedRow, setExpandedRow] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === '1qaz2wsx') {
      setIsAuthenticated(true)
    } else {
      alert('Contraseña incorrecta')
    }
  }

  const fetchRegistros = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/registros?tipo=curso')
      const data = await res.json()
      if (data.registros) {
        setRegistros(data.registros)
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistros()
    }
  }, [isAuthenticated])

  const toggleRow = (id) => {
    if (expandedRow === id) setExpandedRow(null)
    else setExpandedRow(id)
  }

  const exportToExcel = () => {
    if (registros.length === 0) {
      alert("No hay registros para exportar.")
      return
    }

    const dataToExport = registros.map(r => ({
      'Nombre': r.nombre,
      'Apellido': r.apellido,
      'Cédula': r.cedula,
      'Género': r.genero || 'N/A',
      'Edad': r.edad || 'N/A',
      'Fecha de Nacimiento': r.fechaNacimiento || 'N/A',
      'Teléfono': r.telefono,
      'Email': r.email,
      'Estado': r.estado,
      'Municipio': r.municipio || 'N/A',
      'Parroquia': r.parroquia || 'N/A',
      'Institución': r.institucion,
      'Grado Académico': r.gradoAcademico || 'N/A',
      'Rol/Desempeño': r.rolDesempeno || 'N/A',
      'Fecha de Registro': r.creadoEn ? new Date(r.creadoEn).toLocaleDateString() : 'N/A'
    }))

    const ws = XLSX.utils.json_to_sheet(dataToExport)

    // Configurar el ancho de las columnas para que se vean espaciosas y profesionales
    ws['!cols'] = [
      { wpx: 120 }, { wpx: 120 }, { wpx: 100 }, { wpx: 80 }, { wpx: 50 },
      { wpx: 120 }, { wpx: 120 }, { wpx: 200 }, { wpx: 120 }, { wpx: 150 },
      { wpx: 150 }, { wpx: 200 }, { wpx: 150 }, { wpx: 150 }, { wpx: 120 }
    ]

    // Aplicar estilos a la fila de cabecera (Fila 1)
    const range = XLSX.utils.decode_range(ws['!ref'])
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C })
      if (!ws[cellAddress]) continue
      ws[cellAddress].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "107C41" } }, // Verde oficial de Excel / Institucional
        alignment: { horizontal: "center", vertical: "center" }
      }
    }

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Inscritos")
    XLSX.writeFile(wb, `Inscritos_Bambu_ABRAEs_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`)
  }

  const genderStats = useMemo(() => {
    const counts = registros.reduce((acc, curr) => {
      const g = curr.genero || 'No esp.'
      acc[g] = (acc[g] || 0) + 1
      return acc
    }, {})
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] }))
  }, [registros])

  const stateStats = useMemo(() => {
    const counts = registros.reduce((acc, curr) => {
      const e = curr.estado || 'No esp.'
      acc[e] = (acc[e] || 0) + 1
      return acc
    }, {})
    return Object.keys(counts).map(k => ({ name: k, count: counts[k] })).sort((a, b) => b.count - a.count).slice(0, 8)
  }, [registros])

  const COLORS = ['#4caf50', '#81c784', '#aed581', '#dce775', '#fff176', '#ffd54f']

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Panel de Administración</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '0.4rem' }}>Panel de Administración</h1>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--foreground)', fontWeight: '600', maxWidth: '800px', margin: '0 auto 0.5rem auto' }}>
          Reconocimiento, registro y manejo sostenible de bambú en ABRAEs
        </h2>
        <span style={{ display: 'inline-block', background: 'rgba(0, 128, 76, 0.1)', color: 'var(--primary)', padding: '4px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
          🌿 Segunda Cohorte: 18 de noviembre de 2026 – 13 de enero de 2027
        </span>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h3>Listado de Inscritos</h3>
            <span style={{ background: 'var(--accent)', padding: '4px 12px', borderRadius: '12px', color: '#000', fontWeight: 'bold' }}>
              Total: {registros.length}
            </span>
          </div>
          <button
            onClick={exportToExcel}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#107c41', color: 'white', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            📊 Exportar a Excel
          </button>
        </div>

        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--surface-border)' }}>
                <th style={{ padding: '12px' }}>Nombre Completo</th>
                <th style={{ padding: '12px' }}>Cédula</th>
                <th style={{ padding: '12px' }}>Institución</th>
                <th style={{ padding: '12px' }}>Estado</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r) => (
                <React.Fragment key={r.id}>
                  <tr style={{ borderBottom: expandedRow === r.id ? 'none' : '1px solid var(--surface-border)', background: expandedRow === r.id ? 'rgba(0,128,76,0.05)' : 'transparent' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{r.nombre} {r.apellido}</td>
                    <td style={{ padding: '12px' }}>{r.cedula}</td>
                    <td style={{ padding: '12px' }}>{r.institucion}</td>
                    <td style={{ padding: '12px' }}>{r.estado}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button onClick={() => toggleRow(r.id)} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--primary)', background: 'transparent', color: 'var(--primary)', cursor: 'pointer' }}>
                        {expandedRow === r.id ? 'Cerrar' : 'Ver Detalles'}
                      </button>
                    </td>
                  </tr>
                  {expandedRow === r.id && (
                    <tr style={{ borderBottom: '1px solid var(--surface-border)', background: 'rgba(0,128,76,0.05)' }}>
                      <td colSpan="5" style={{ padding: '1rem 2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
                          <div><strong>Género:</strong> {r.genero || 'N/A'}</div>
                          <div><strong>Edad:</strong> {r.edad || 'N/A'}</div>
                          <div><strong>F. Nacimiento:</strong> {r.fechaNacimiento || 'N/A'}</div>
                          <div><strong>Teléfono:</strong> {r.telefono}</div>
                          <div><strong>Email:</strong> {r.email}</div>
                          <div><strong>Municipio:</strong> {r.municipio || 'N/A'}</div>
                          <div><strong>Parroquia:</strong> {r.parroquia || 'N/A'}</div>
                          <div><strong>Grado Académico:</strong> {r.gradoAcademico || 'N/A'}</div>
                          <div><strong>Rol/Desempeño:</strong> {r.rolDesempeno || 'N/A'}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {registros.length === 0 && (
                <tr><td colSpan="5" style={{ padding: '12px', textAlign: 'center' }}>No hay registros aún.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {registros.length > 0 && (
        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Distribución por Género</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={genderStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
                    {genderStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Top Estados</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={stateStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--foreground)' }} />
                  <YAxis tick={{ fill: 'var(--foreground)' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--surface)', color: 'var(--foreground)' }} />
                  <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
