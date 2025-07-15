import { Suspense, useState } from "react";
import type { Challenge } from "../../types";
import Container from "./Container";

const Tab = ({ challenge }: { challenge: Challenge }) => {
  const [tab, setTab] = useState<"demo" | "code">("demo");

  const { title, description, component: ComponentToLoad } = challenge;

  const tabStyle = "px-5 py-3 border border-b-0 border-gray-400 cursor-pointer";

  return (
    <Container>
      <div className="tabs-wrapper">
        <ul className="tabs flex gap-x-4 border-b border-gray-400">
          <li>
            <button
              type="button"
              onClick={() => setTab("demo")}
              className={tabStyle}
            >
              Demo
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setTab("code")}
              className={tabStyle}
            >
              Code
            </button>
          </li>
        </ul>

        <div className="tabs-panels py-6">
          {tab === "demo" && (
            <Suspense fallback={"Loading"}>
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
              <p className="mb-4">{description}</p>
              <ComponentToLoad />
            </Suspense>
          )}
          {tab === "code" && (
            <div className="" id="code">
              Code
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Tab;
