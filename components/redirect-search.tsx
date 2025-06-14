'use client';

// Component added on Home page to redirect to search page when clicked on. 
import { useRouter } from "next/navigation"
export function SearchGame() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/search')
      }
  return (
    <button onClick={handleClick}>
        Go find some games!
    </button>
  )
} 