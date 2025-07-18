// NOTE: This code is written for a single file challenge.
// In a real-world application, it should be refactored for better separation of concerns:
// - Move types to a `types` file
// - Extract `CharacterCard` into its own component
// - Move fetch logic into a custom hook or separate service
// - Improve error handling and loading states
// This format is intentionally flat to meet the constraints of a coding round.

import { useEffect, useState } from "react";

const API_URL = "https://potterapi-fedeperin.vercel.app/en/characters";

type Character = {
  fullName: string;
  nickname: string;
  hogwartsHouse: string;
  interpretedBy: string;
  image: string;
  birthdate: string;
  index: number;
};

const FetchAPIData = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [perPageCount, setPerPageCount] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string>("");

  // fetch data
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}?max=${perPageCount}&page=${currentPage}`,
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
        const newData = data.slice(0, perPageCount);
        setHasMore(data.length >= perPageCount);
        setCharacters((prev) =>
          currentPage === 1 ? newData : [...prev, ...newData]
        );
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [perPageCount, currentPage]);

  const CharacterCard = ({ item }: { item: Character }) => {
    return (
      <div className="sm:w-1/2 lg:w-1/3 xl:w-1/4 px-4">
        <div className="border border-gray-300 rounded-xl relative max-w-[350px] mx-auto bg-black">
          <img
            src={item.image}
            alt={item.fullName}
            width={350}
            height={500}
            className="object-cover"
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

  const handlePerPageCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPageCount(Number(e.target.value));
    setCharacters([]);
    setCurrentPage(1);
  };

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
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

      <div>
        <select
          value={perPageCount}
          onChange={handlePerPageCount}
          className="h-[45px] px-4 border border-gray-400 mb-6"
        >
          <option value={""} disabled>
            -- Per Page Items --
          </option>
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap -mx-4 gap-y-8">
        {characters.map((item) => {
          return <CharacterCard key={item.index} item={item} />;
        })}
      </div>

      {hasMore && (
        <div className="text-center py-4 mt-6">
          <button
            type="button"
            className="font-bold bg-black text-white py-4 px-8 cursor-pointer"
            onClick={loadMore}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
};

export default FetchAPIData;
