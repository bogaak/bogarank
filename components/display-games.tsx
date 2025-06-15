'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Database } from '@/database.types'
import RankButton from "@/components/rank-button";



export function DisplayGames() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)

  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/games?query=${query}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setGames(data)
        setLoading(false)
      })
  }, [query, page])

  if (loading) return <p>Loading games...</p>

  console.log("Games fetched:", games);

  return (
    <div className="grid">
      {games.map((game: any) => (
        <RankButton key={game.id} game_id={game.id} name={game.name} />
      ))}
    </div>
  )
}
