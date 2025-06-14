'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; 

// Search component where users can search for games, updates the URL with search query to get games. 
export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();



    const handleSearch = useDebouncedCallback((game) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (game) {
            params.set('query', game);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);

    }, 200);
 
    return (
        <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
            Search
        </label>
        <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus: text-stone-950"
            placeholder={placeholder}
            onChange={(e) => {
            handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
        />
        </div>
    );
}
