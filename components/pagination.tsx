'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';


export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(createPageURL(currentPage - 1));
    }
  }

  const handleNext = () => {
    if (currentPage <= totalPages) {
      router.push(createPageURL(currentPage + 1));
    }
  }

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
      >
        Previous
      </button>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}