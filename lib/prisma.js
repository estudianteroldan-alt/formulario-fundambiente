import { PrismaClient } from '@prisma/client'

// Auto-sanitizar DATABASE_URL si incluye prefijos o comillas
if (process.env.DATABASE_URL) {
  let cleanUrl = process.env.DATABASE_URL.trim()
  if (cleanUrl.startsWith('DATABASE_URL=')) {
    cleanUrl = cleanUrl.substring('DATABASE_URL='.length).trim()
  }
  cleanUrl = cleanUrl.replace(/^["']|["']$/g, '').trim()
  process.env.DATABASE_URL = cleanUrl
}

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: process.env.DATABASE_URL
      ? { db: { url: process.env.DATABASE_URL } }
      : undefined
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
