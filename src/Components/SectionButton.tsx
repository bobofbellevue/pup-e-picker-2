import { TAB } from "../types";
import { useStatusContext } from "../Providers/StatusProvider";

interface SectionButtonProps {
  tab: TAB;
  count: number;
  name: string;
}

export const SectionButton = (
  props: SectionButtonProps
) => {
  const { activeTab, isLoading, setActiveTab } = useStatusContext();
  const { tab, name, count } = props;

  const makeSelectorClassName = (
    tab: TAB,
    activeTab: TAB,
    isLoading: boolean
  ) => {
    let className = "selector";
    if (activeTab === tab) {
      className += " active";
    } else {
      className += " inactive";
    }
    if (isLoading) {
      className += " disabled";
    }
    return className;
  };

  return (
    <div
      className={makeSelectorClassName(tab, activeTab, isLoading)}
      onClick={() => setActiveTab(tab)}
    >
      {count == -1 ? `${name}` : `${name} ( ${count} )`}
    </div>
  );
};
