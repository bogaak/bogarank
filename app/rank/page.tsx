import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'
import { redirect } from 'next/navigation'
import RankButton from "@/components/rank-button";


// Temporary page used to rank games. This is probably going to be removed later. 
export default async function Page() {

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

  const { data, error } = await supabase.from("games").select("name, id").limit(10).order("id", {ascending: true});

  
  const result = await supabase.from("user_ranks").select("games").eq('id', session?.user?.id);
  const listItems = data!.map((game: Database.games) => (
    <li key={game.id}>
        <RankButton game_id={game.id} name={game.name}></RankButton>
    </li>
))

let alreadyRanked: any;

if (result.data![0]["games"] !== null){
    alreadyRanked = result.data![0]["games"].map((game: any) => (
        <li key={game.id}>
            {game.name} 
        </li>
    ))
    
}
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1> Pick a game to rank!</h1>
            <ul>{listItems}</ul>

        <h1>Games you've already ranked:</h1>
        <ul>{alreadyRanked}</ul>
    </div>
  );
}
