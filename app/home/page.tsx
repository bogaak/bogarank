import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'
import { redirect } from 'next/navigation'
import { DisplayRanks } from "@/components/display-ranks";
import { SearchGame } from "@/components/redirect-search"

// If user is logged in, it will display their ranks and allow them to search for a game to rank. If not, it's gonna redirect to the signup page.
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

  const { data, error } = await supabase.from("users").select("*").eq('id', session?.user?.id);

  if (data && data[0].display_name.length === 0){
      redirect('/signup')
  }

  const displayName = data ? data[0].display_name : 'no_display_name';
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to boga rank, {displayName}!</h1>
      <DisplayRanks></DisplayRanks>
      <SignOut></SignOut>
      <SearchGame></SearchGame>
    </div>
  );
}
