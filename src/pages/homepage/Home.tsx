import Card from "../../components/card/Card";
import { challenges } from "../../challenges/config";

const Home = () => {
  return (
    <div className="wrapper">
      {challenges.map((item) => (
        <Card result={item} />
      ))}
    </div>
  );
};

export default Home;
