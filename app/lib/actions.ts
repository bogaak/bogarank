'use server';
import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";


 
export async function updateDisplayName(id: string, formData: FormData) {
  // Take displayName from form and then add it to supabase. 
  const session = await auth();
  
  // Sample usage of querying db
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

  const displayName = formData.get('display_name');

  const { data, error } = await supabase.from("users").update({display_name: displayName}).eq('id', session?.user?.id);

  redirect('/home');
}

export async function rankGame(game_id: Database.games.id, game_name: Database.games.name) {
  // Take displayName from form and then add it to supabase. 
  const session = await auth();
  
  // Sample usage of querying db
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

  const getUserArray = await supabase.from("user_ranks").select("games").eq('id', session?.user?.id);

  let currArray = getUserArray.data![0]["games"];

  if (currArray === null){
    currArray = [{name: game_name, id: game_id}];
  }

  else{
    currArray.push({name: game_name, id: game_id});
  }
  
  const {data, error} = await supabase.from("user_ranks").update({games: currArray}).eq('id', session?.user?.id);

  revalidatePath('/rank');
}