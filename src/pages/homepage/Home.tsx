import Card from "../../components/card/Card";
import { challenges } from "../../challenges/config";
import { Container } from "../../components/common";

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col sm:flex-row flex-wrap gap-y-8 -mx-4">
        {challenges.map((item) => (
          <Card key={item.slug} result={item} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
