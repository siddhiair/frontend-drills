import { useState } from "react";

const CounterComponent = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };
  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  const buttonClass =
    "text-semibold text-white bg-black px-5 py-1 cursor-pointer transition-colors hover:bg-gray-700";

  return (
    <div className="border border-gray-400 px-4 py-4 flex justify-between items-center transition">
      <span className="text-xl font-bold">{count}</span>
      <div className="flex gap-x-3">
        <button className={buttonClass} type="button" onClick={decrement}>
          Decrease
        </button>
        <button className={buttonClass} type="button" onClick={increment}>
          Increase
        </button>
      </div>
    </div>
  );
};

export default CounterComponent;
