import { SignUp } from "@/components/sign-up";

// New user signup page. Displays after user logs in using OAuth.
export default async function Page() {
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Please setup your display name below!!</h1>
      <SignUp></SignUp>
    </div>
  );
}
