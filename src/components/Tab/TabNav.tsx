import type { TabsProps } from "../../types";

const TabNav = ({
  tabs,
  activeTab,
  handleTab,
}: {
  tabs: TabsProps[];
  activeTab: TabsProps;
  handleTab: (id: string) => void;
}) => {
  const tabStyle = "px-5 py-3 border border-b-0 border-gray-400 cursor-pointer";

  return (
    <ul className="tabs flex gap-x-4 border-b border-gray-800">
      {tabs.map((tab) => {
        return (
          <li>
            <button
              type="button"
              className={`${tabStyle} ${
                activeTab?.id === tab.id ? "bg-gray-400" : ""
              }`}
              onClick={() => handleTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TabNav;
