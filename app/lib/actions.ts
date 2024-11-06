'use server';
import { auth } from "@/auth"
import { createClient } from "@supabase/supabase-js";
import { Database } from './database.types'
import { redirect } from 'next/navigation';


 
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