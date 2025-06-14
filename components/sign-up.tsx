import { updateDisplayName } from "@/app/lib/actions"
import { auth } from "@/auth"

// on signup, we ask user to enter a display name.
export async function SignUp() {

    const session = await auth();
    const updateDisplayNameWithId = updateDisplayName.bind(null, session?.user?.id!)

  return (
    <form action={updateDisplayNameWithId}>
        <label>Enter a display name below...</label>
        <div className=" focus: text-stone-950">
          <input type="text" id="display_name" name="display_name" required/>
        </div>
        <button type="submit">Submit</button>
    </form>
  )
}