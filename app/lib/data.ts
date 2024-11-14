import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'

const ITEMS_PER_PAGE = 10; // temp decision, may adjust later. 

export async function fetchGamesPages(query: string) {
    const trimmed = query.trim();
    const formattedQuery = trimmed.replace(/\s/g, "+");

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
        
    const { data, count, error } = await supabase.from("games").select("*", { count: 'exact', head: true}).textSearch('fts', formattedQuery);
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    
    return totalPages;
}

export async function fetchGames(query: string, currentPage: number){
    const trimmed = query.trim();
    const formattedQuery = trimmed.replace(/\s/g, "+");

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
    const { data, error } = await supabase.from("games").select("id, name").textSearch('fts', formattedQuery).range(offset, offset + ITEMS_PER_PAGE - 1).order('name', {ascending: true});

    return data;
}