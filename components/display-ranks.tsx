import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'

// Component to display already ranked games. This displays right now at main page when user logs in / at home page. 
export async function DisplayRanks() {
    const session = await auth();
    const accessToken = session?.supabaseAccessToken;
    const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        global: {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        },
        }
    )

    const { data, error } = await supabase.from("user_ranks").select("games").eq('id', session?.user?.id);

    if ( data && data[0].games === null){
        return(
            <div>
                <h1>Currently there are no games you ranked. Try ranking some now!</h1>
            </div>

        )
    }

    else{
        const listItems = data![0].games.map((game: Database.user_ranks.games) => (
            <li key={game.id}>
                {game.name}
            </li>
        ))
        return (
            <div>
                <ul>{listItems}</ul>
            </div>
          )
    }
}