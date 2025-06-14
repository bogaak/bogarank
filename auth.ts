import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { SignJWT } from "jose"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  }), 
  callbacks: {
    async session({ session, user }) {

      session.user.id = user.id;
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };

        const accessToken = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(new TextEncoder().encode(signingSecret));
        session.supabaseAccessToken = accessToken;        
      }
      return session
    },    
  }
})