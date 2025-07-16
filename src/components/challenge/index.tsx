import { useParams } from "react-router-dom";
import { challenges } from "../../challenges/config";
import Demo from "./Demo";
import Code from "./Code";
import Tab from "../Tab";

const Challenge = () => {
  const { slug } = useParams();
  const challengeDetails = challenges.find((item) => item.slug === slug);

  if (!challengeDetails) return "No Challenge found";

  return (
    <Tab
      tabs={[
        {
          id: "demo",
          label: "Demo",
          content: <Demo challenge={challengeDetails} />,
        },
        {
          id: "code",
          label: "Code",
          content: <Code loadCode={challengeDetails.loadCode} />,
        },
      ]}
    />
  );
};

export default Challenge;
