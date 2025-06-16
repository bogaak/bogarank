// app/api/games/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { fetchGames } from '@/app/lib/data'

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || ''
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10)

  const games = await fetchGames(query, page)

  return NextResponse.json(games)
}
