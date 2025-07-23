// NOTE: This code is written for a single file challenge.
// In a real-world application, it should be refactored for better separation of concerns:
// - Move types to a `types` file
// - Extract `CharacterCard` into its own component
// - Move fetch logic into a custom hook or separate service
// - Improve error handling and loading states
// This format is intentionally flat to meet the constraints of a coding round.

import { useEffect, useState } from "react";

const API_URL = "https://potterapi-fedeperin.vercel.app/en/characters";
const PER_PAGE_COUNT = 6;
const SCROLL_OFFSET = 80;

type Character = {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  image: string;
  birthdate: string;
  index: number;
};

const FetchAPIInfiniteScroll = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  // fetch data
  useEffect(() => {
    if (!hasMore) return;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}?max=${PER_PAGE_COUNT}&page=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          setError("Can't fetch the data. Reload the page.");
        }
        const data = await response.json();
        const newData = data.slice(0, PER_PAGE_COUNT);
        setCharacters((prev) =>
          currentPage === 1 ? newData : [...prev, ...newData]
        );
        setHasMore(data.length >= PER_PAGE_COUNT);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, hasMore]);

  const loadMore = () => {
    if (loading || !hasMore) return;

    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - SCROLL_OFFSET
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // fetch next set on scroll by updating currentPage state
  useEffect(() => {
    window.addEventListener("scroll", loadMore);

    return () => window.removeEventListener("scroll", loadMore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CharacterCard = ({ item }: { item: Character }) => {
    return (
      <div className="sm:w-1/2 lg:w-1/3 px-4">
        <div className="border border-gray-300 rounded-xl relative mx-auto bg-black">
          <img
            src={item.image}
            alt={item.fullName}
            width={350}
            height={500}
            className="w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black px-4 pt-14 pb-5 text-white">
            <h4 className="text-xl font-bold mb-2">{item.fullName}</h4>
            <p className="xl:text-sm">
              <span className="font-bold">House: </span>
              {item.hogwartsHouse}
            </p>
            <p className="xl:text-sm">
              <span className="font-bold">Birthdate: </span>
              {item.birthdate}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return <h2 className="text-xl font-bold my-4">{error}</h2>;
  }

  return (
    <>
      {characters.length === 0 && loading && <p>Fetching data...</p>}
      {characters.length === 0 && !loading && (
        <h2 className="text-xl font-bold my-4">No data received.</h2>
      )}

      <div className="flex flex-col sm:flex-row flex-wrap -mx-4 gap-y-8">
        {characters.map((item) => {
          return <CharacterCard key={item.index} item={item} />;
        })}
      </div>

      {!hasMore && (
        <div className="font-bold mt-8 text-gray-500 text-sm text-center">
          All records fetched.
        </div>
      )}
    </>
  );
};

export default FetchAPIInfiniteScroll;
