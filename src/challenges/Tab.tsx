// NOTE: This code is structured for a single-file coding assessment.
// the implementation should be modularized for better maintainability:
// - Move `TabNav`, `TabPanel`, and `Tab` into separate files/components
// - Extract type definitions into a shared `types.ts`
// - Add full accessibility support with keyboard navigation

import { useState } from "react";

type TabsProps = {
  id: string;
  label: string;
  content: React.ReactNode;
};
type TabsPanelProps = {
  panelId: string;
  content: React.ReactNode;
  activeTabId: string;
};

const tabsConfig: TabsProps[] = [
  {
    id: "overview",
    label: "Overview",
    content:
      "This tab provides an in-depth summary of the product, highlighting its core features, design philosophy, and intended use cases. It offers a comprehensive introduction that helps users quickly grasp what the product is about and how it stands out in the market. Whether you’re looking for key benefits or overall value, this section covers all essential points to set the context.",
  },
  {
    id: "specs",
    label: "Specifications",
    content:
      "Here, you will find all the technical specifications of the product listed in detail. This includes dimensions, weight, materials used, power requirements, and performance metrics. Understanding these specs is important for evaluating the product’s compatibility with your needs and environment. It also aids users who need precise technical details before making a purchase.",
  },
  {
    id: "reviews",
    label: "Reviews",
    content:
      "In this section, users share their real-world experiences with the product. You can read both positive and critical feedback that provides valuable insights beyond marketing claims. Reviews help highlight practical benefits, potential issues, and overall satisfaction levels from a diverse set of customers. This collective wisdom can assist you in making a well-informed decision.",
  },
  {
    id: "faq",
    label: "FAQ",
    content:
      "The FAQ tab compiles answers to the most common questions and concerns regarding the product. It covers everything from setup instructions and troubleshooting tips to warranty information and usage recommendations. This section is designed to quickly resolve doubts and ensure users get the most out of their purchase with minimal hassle.",
  },
];

const TabNav = ({
  tabsConfig,
  activeTabId,
  handleTab,
}: {
  tabsConfig: TabsProps[];
  activeTabId: string;
  handleTab: (id: string) => void;
}) => {
  const tabStyle =
    "py-3 px-5 text-sm font-bold rounded-full bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 focus:outline-0";

  return (
    <ul
      className="tabs flex gap-x-4 pb-6 border-b border-gray-300 overflow-x-auto"
      role="tablist"
    >
      {tabsConfig.map((tab) => {
        return (
          <li key={tab.id}>
            <button
              type="button"
              className={`${tabStyle} ${
                activeTabId === tab.id ? "bg-blue-600! text-white!" : ""
              }`}
              onClick={() => handleTab(tab.id)}
              role="tab"
              aria-selected={activeTabId === tab.id}
              aria-controls={`${tab.id}-panel`}
            >
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const TabPanel = (props: TabsPanelProps) => {
  const { panelId, content, activeTabId } = props;
  return (
    <div
      className={`tabs-panels py-6 ${
        panelId === activeTabId ? "block" : "hidden"
      }`}
      role="tabpanel"
      id={`${panelId}-panel`}
      aria-labelledby={`${panelId}-panel`}
      aria-hidden={panelId !== activeTabId}
    >
      {content}
    </div>
  );
};

const Tab = () => {
  const [activeTabId, setActiveTabId] = useState<string>(
    tabsConfig.length ? tabsConfig[0].id : ""
  );

  if (!tabsConfig.length) return <div>No tab content added</div>;

  return (
    <>
      <TabNav
        tabsConfig={tabsConfig}
        activeTabId={activeTabId}
        handleTab={setActiveTabId}
      />
      {tabsConfig.map(({ id, content }) => (
        <TabPanel
          key={id}
          panelId={id}
          content={content}
          activeTabId={activeTabId}
        />
      ))}
    </>
  );
};

export default Tab;
