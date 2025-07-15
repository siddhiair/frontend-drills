import { useParams } from "react-router-dom";
import { challenges } from "../../challenges/config";
import { Suspense } from "react";

const Challenge = () => {
  const { slug } = useParams();
  const challengeDetails = challenges.find((item) => item.slug === slug);

  if (!challengeDetails) return "No Challenge found";

  const ComponentToLoad = challengeDetails.component;

  return (
    <Suspense fallback={"Loading"}>
      <ComponentToLoad />
    </Suspense>
  );
};

export default Challenge;
