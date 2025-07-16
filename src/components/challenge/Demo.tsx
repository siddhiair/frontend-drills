import { Suspense } from "react";
import type { Challenge } from "../../types";

const Demo = ({ challenge }: { challenge: Challenge }) => {
  const { title, description, component: ComponentToLoad } = challenge;
  return (
    <Suspense fallback={"Loading..."}>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="mb-4">{description}</p>
      <ComponentToLoad />
    </Suspense>
  );
};

export default Demo;
