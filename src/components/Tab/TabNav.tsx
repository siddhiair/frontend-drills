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
  const tabStyle = "py-3 text-sm font-bold cursor-pointer opacity-60";

  return (
    <ul className="tabs flex gap-x-8 border-b border-gray-300">
      {tabs.map((tab) => {
        return (
          <li key={tab.label}>
            <button
              type="button"
              className={`${tabStyle} ${
                activeTab?.id === tab.id ? "opacity-100" : ""
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
