import { useState } from "react";
import type { TabsProps } from "../../types";
import Container from "../common/Container";
import TabNav from "./TabNav";

const Tab = ({ tabs }: { tabs: TabsProps[] }) => {
  const [tab, setTab] = useState<string>(tabs[0].id);

  const activeTab = tabs.find((t) => t.id === tab);

  if (!activeTab) return null;

  return (
    <Container>
      <TabNav tabs={tabs} activeTab={activeTab} handleTab={setTab} />

      <div className="tabs-panels py-6">{activeTab?.content}</div>
    </Container>
  );
};

export default Tab;
