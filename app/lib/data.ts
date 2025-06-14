import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'

const ITEMS_PER_PAGE = 10; // temp decision, may adjust later. 

// File used to fetch all kinds of data from the db. 
export async function fetchGamesPages(query: string) {
    
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
        
    const { data, count, error } = await supabase.from("games").select("*", { count: 'exact', head: true}).ilike('name', `%${query}%`);
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    
    return totalPages;
}

export async function fetchGames(query: string, currentPage: number){
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
    
    const offset = (currentPage-1) * ITEMS_PER_PAGE;
    const { data, error } = await supabase.from("games").select("id, name").ilike('name', `%${query}%`).range(offset, offset + ITEMS_PER_PAGE - 1).order('name', {ascending: true});

    return data;
}