import { createContext, useCallback, useContext, useState } from "react";

interface DrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: DrawerOptionsProps[];
  toggleDrawerOpen: () => void;
  setDrawerOption: (newDrawerOptions: DrawerOptionsProps[]) => void;
}

interface DrawerOptionsProps {
  label: string;
  path: string;
}

interface DrawerProviderProps {
  children: React.ReactNode;
}

const DrawerContext = createContext({} as DrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<DrawerOptionsProps[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((OldDrawerOpen) => !OldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: DrawerOptionsProps[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    [],
  );

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
        drawerOptions,
        setDrawerOption: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
