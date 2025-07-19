// NOTE: In a real-world application, consider refactoring for better maintainability and performance:
// - Move types and data to separate files
// - Extract the country list rendering and details display into separate components
// - Extract keyboard navigation logic and selection handlers into custom hooks or utilities
// - Use debounce (e.g., lodash-es debounce) on input handling to optimize performance for large or data-heavy configurations
// This flat structure is chosen here to meet the constraints of a coding challenge or small demo.
// Icon library: https://react-icons.github.io/react-icons/

import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

type CountriesType = {
  name: string;
  capital: string;
  area: string;
  population: number;
  currency: string;
};
const countries: CountriesType[] = [
  {
    name: "Germany",
    capital: "Berlin",
    area: "357,022 sq km",
    population: 83149300,
    currency: "Euro (EUR)",
  },
  {
    name: "Greece",
    capital: "Athens",
    area: "131,957 sq km",
    population: 10724599,
    currency: "Euro (EUR)",
  },
  {
    name: "India",
    capital: "New Delhi",
    area: "3,287,263 sq km",
    population: 1393409038,
    currency: "Indian Rupee (INR)",
  },
  {
    name: "Indonesia",
    capital: "Jakarta",
    area: "1,904,569 sq km",
    population: 273523621,
    currency: "Indonesian Rupiah (IDR)",
  },
  {
    name: "Canada",
    capital: "Ottawa",
    area: "9,984,670 sq km",
    population: 38008005,
    currency: "Canadian Dollar (CAD)",
  },
  {
    name: "Cameroon",
    capital: "Yaoundé",
    area: "475,442 sq km",
    population: 26545863,
    currency: "Central African CFA franc (XAF)",
  },
  {
    name: "Australia",
    capital: "Canberra",
    area: "7,692,024 sq km",
    population: 25687041,
    currency: "Australian Dollar (AUD)",
  },
  {
    name: "Austria",
    capital: "Vienna",
    area: "83,879 sq km",
    population: 9006398,
    currency: "Euro (EUR)",
  },
  {
    name: "Brazil",
    capital: "Brasília",
    area: "8,515,767 sq km",
    population: 213993437,
    currency: "Brazilian Real (BRL)",
  },
  {
    name: "Belgium",
    capital: "Brussels",
    area: "30,528 sq km",
    population: 11555997,
    currency: "Euro (EUR)",
  },
];

const SearchBarFilter = () => {
  const [inputVal, setInputVal] = useState<string>("");
  const [filteredList, setFilteredList] = useState<CountriesType[]>(countries);
  const [showList, setShowList] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [result, setResult] = useState<CountriesType>();

  useEffect(() => {
    const result = countries.filter((country) =>
      country.name.toLowerCase().startsWith(inputVal.toLowerCase())
    );

    setFilteredList(result);
    setHighlightedIndex(-1);
  }, [inputVal]);

  const applySelection = (countryName: string) => {
    setInputVal("");
    setResult(countries.find((item) => item.name === countryName));
    setShowList(false);
    setFilteredList(countries);
    setHighlightedIndex(-1);
  };

  const handleMouseSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const selected = e.currentTarget.dataset.country;
    if (selected) {
      applySelection(selected);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
    if (val === "") setFilteredList(countries);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showList || filteredList.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredList.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev <= 0 ? filteredList.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          applySelection(filteredList[highlightedIndex].name);
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowList(false);
        break;
    }
  };

  return (
    <>
      <div className="relative border border-gray-300 rounded-lg w-full max-w-[500px]">
        <div className="flex items-center">
          <IoSearch
            className="ml-4 text-gray-400 text-xl"
            aria-label="Search Country"
          />
          <input
            type="text"
            value={inputVal}
            className="h-[45px] w-full border-0 pr-4 pl-2 outline-none grow"
            onChange={handleInput}
            onFocus={() => setShowList(true)}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowList(false), 100)}
            placeholder="Search country..."
          />
        </div>
        {showList && (
          <ul
            className="absolute left-0 right-0 mt-1 border-t border-gray-300 bg-white shadow-md z-10 max-h-40 overflow-y-auto rounded-b-lg"
            role="listbox"
          >
            {filteredList.length === 0 ? (
              <li
                className="text-center py-2 px-4 font-bold text-gray-500"
                role="option"
                aria-disabled="true"
              >
                No matching result found.
              </li>
            ) : (
              filteredList.map((country, index) => (
                <li
                  key={country.name}
                  data-country={country.name}
                  className={`py-2 px-4 cursor-pointer ${
                    index === highlightedIndex
                      ? "bg-gray-300"
                      : "hover:bg-gray-100"
                  }`}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  onMouseDown={handleMouseSelect}
                >
                  {country.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {result && (
        <>
          <style>
            {`
              .SearchBarFilter-table td{
                padding: 6px 15px;
                border: 1px solid #eee;
              }
            `}
          </style>
          <div className="mt-8 max-w-md">
            <h5 className="text-xl font-bold mb-4">
              Information on{" "}
              <span className="text-blue-600">{`"${result.name}"`}</span>:
            </h5>
            <table className="w-full border border-gray-400 SearchBarFilter-table border-collapse">
              <tbody>
                <tr>
                  <td className="font-bold">Capital</td>
                  <td>{result.capital}</td>
                </tr>
                <tr>
                  <td className="font-bold">Area</td>
                  <td>{result.area}</td>
                </tr>
                <tr>
                  <td className="font-bold">Population</td>
                  <td>{result.population.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="font-bold">Currency</td>
                  <td>{result.currency}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default SearchBarFilter;
