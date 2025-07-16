import { Link } from "react-router-dom";
import { Container } from "../common";

const Header = () => {
  return (
    <header className="py-4 bg-black mb-8">
      <Container>
        <nav>
          <Link
            to="/"
            className="font-bold text-lg text-white hover:opacity-70 transition-colors"
          >
            Challenges
          </Link>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
