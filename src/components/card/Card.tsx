import { Link } from "react-router-dom";
import type { Challenge } from "../../types";

const Card = ({ result }: { result: Challenge }) => {
  const { title, description, slug } = result;
  return (
    <div className="sm:w-1/2 lg:w-1/3 px-4">
      <div className="card p-5 border-gray-300 border rounded-lg transition-shadow hover:shadow-md">
        <h4 className="card--title text-xl font-bold mb-1">{title}</h4>
        <p className="card--desc">{description}</p>
        <Link
          className="card--link inline-block py-1 mt-2 font-semibold text-blue-600 border-b-2 border-b-initial text-sm transition-colors hover:text-blue-900"
          to={`/challenge/${slug}`}
          aria-label="View Solution"
        >
          View Solution
        </Link>
      </div>
    </div>
  );
};

export default Card;
