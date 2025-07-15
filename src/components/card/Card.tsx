import { Link } from "react-router-dom";
import type { Challenge } from "../../types";

const Card = ({ result }: { result: Challenge }) => {
  const { title, description, slug } = result;
  return (
    <div className="card">
      <h4 className="card--title">{title}</h4>
      <p className="card--desc">{description}</p>
      <Link
        className="card--link"
        to={`/challenge/${slug}`}
        aria-label="View Solution"
      >
        Answer
      </Link>
    </div>
  );
};

export default Card;
