import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from '@/database.types'
import { redirect } from 'next/navigation'
import RankingGame from "@/components/rank-game";
import { rankGame } from "../lib/actions";

// Essentially page where user interacts with binary search to rank a game. If this is the first game / already ranked game, it will redirect to the appropriate page.
export default async function Page(props: {
    searchParams?: Promise<{
        id?: string;
        game?: string;
    }>;
}) {

  const session = await auth();
  const searchParams = await props.searchParams;
  const id = searchParams?.id || '';
  const game = searchParams?.game || '';

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

  const userId: string = session?.user?.id ?? '';

  if (!userId) {
    redirect("/home");
  }

  type Game = {
    id: string;
    name: string;
  }
  
  const result = await supabase.from("user_ranks").select("games").eq('id', userId);
  let games_list = result.data![0]["games"] as Game[]; //pass this to binarysearch component if its not null. 

  if (games_list === null){
    games_list = [{id: id, name: game}]; // maybe add a prompt to notify user that since this is the first ranked one, we dont need to actually do binary search...
    await rankGame(games_list);
    redirect("/home"); // when u insert, it displays an empty screen, then redirects. Need to fix so that it displays something maybe...
  }

  // If the game is already in the list, 
  console.log(games_list);
  if (games_list.some(g => g.id === id)) {
    redirect("/already-exists");
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <RankingGame gameList={games_list} gameName={game} game_id={id}></RankingGame>
    </div>
  );
}
