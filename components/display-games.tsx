
import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'
import { fetchGames } from "@/app/lib/data";
import RankButton from "@/components/rank-button";

// Displaying games that users can click to rank. 
export async function DisplayGames({query, currentPage}: {query: string, currentPage: number}) {

    const games = await fetchGames(query, currentPage);
    const listGames = games!.map((game: Database.games) => (
        <li key={game.id}>
            <RankButton game_id={game.id} name={game.name}></RankButton>
        </li>
    ))
    return (
        <div>
            <ul>{listGames}</ul>
        </div>
    )
    
}