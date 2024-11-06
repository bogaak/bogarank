import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'
import { redirect } from 'next/navigation'



export default async function Page() {

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

  const { data, error } = await supabase.from("users").select("*").eq('id', session?.user?.id); 

  if (data && data[0].display_name.length === 0){
      redirect('/signup')
  }

  const displayName = data ? data[0].display_name : 'no_display_name';
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to boga rank, {displayName}! Thanks for coming!</h1>
      <SignOut></SignOut>
    </div>
  );
}
