import { ReactNode, createContext, useState, useContext } from "react";
import { TAB, TabValues } from "../types.ts";

type TStatusProvider = {
  activeTab: TAB;
  setActiveTab(tab: TAB): void;
  isLoading: boolean;
  setIsLoading(status: boolean): void;
};

const StatusContext = createContext<TStatusProvider>({} as TStatusProvider);

export const StatusProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, activeTabSetter] = useState<TAB>(TabValues.NONE);
  const [isLoading, setIsLoading] = useState(false);

  const setActiveTab = (tab: TAB) => {
    if (tab === activeTab) {
      tab = TabValues.NONE;
    }
    activeTabSetter(tab);
  }

  return (
    <StatusContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatusContext = () => useContext(StatusContext);
