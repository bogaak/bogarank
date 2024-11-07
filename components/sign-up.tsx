import { updateDisplayName } from "@/app/lib/actions"
import { auth } from "@/auth"

export async function SignUp() {

    const session = await auth();
    const updateDisplayNameWithId = updateDisplayName.bind(null, session?.user?.id!)

  return (
    <form action={updateDisplayNameWithId}>
        <label>Enter a display name below...</label>
        <input type="text" id="display_name" name="display_name" required/>
        <button type="submit">Submit</button>
    </form>
  )
}