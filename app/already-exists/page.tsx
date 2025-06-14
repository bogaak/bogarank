'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// For when user is trying to rank a game, but this is already in their list. 
export default async function Page() {
  
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/search'); // Change '/search' to your target route
    }, 2000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [router]);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1> You've already ranked this game... Redirecting back to search.</h1>
    </div>
  );
}
