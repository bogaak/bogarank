
import { signIn } from "@/auth"

// basic sign in with Google. Explore other options to sign in with Discord, etc.
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/home"} )
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 