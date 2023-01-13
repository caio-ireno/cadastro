import { createContext, useCallback, useContext, useState } from 'react';

interface DrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
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
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((OldDrawerOpen) => !OldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};
