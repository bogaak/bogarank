import Search from "@/components/search"
import { fetchGamesPages } from "../lib/data";
import Pagination from "@/components/pagination";
import { DisplayGames } from "@/components/display-games";

// Search page. Need to fix pagination to just go 1 page up / down at a time instead of all. 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchGamesPages(query);
  
  return (
    <div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1> Search for a game here!</h1>
      <Search placeholder="Search for a game here..."></Search>
      <p></p>
      <DisplayGames query={query} currentPage={currentPage}></DisplayGames>
      <p></p>
      <p></p>
      <div className="items-end">
        <Pagination totalPages={totalPages}></Pagination>
      </div>
    </div>
    </div>
  );
}
