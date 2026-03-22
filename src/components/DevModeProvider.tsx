import { createContext, useContext, useState, useCallback } from 'react';

interface DevModeContextType {
  isEnabled: boolean;
  toggle: () => void;
  selectedElement: HTMLElement | null;
  setSelectedElement: (el: HTMLElement | null) => void;
}

const DevModeContext = createContext<DevModeContextType>({
  isEnabled: false,
  toggle: () => {},
  selectedElement: null,
  setSelectedElement: () => {},
});

export function useDevMode() {
  return useContext(DevModeContext);
}

export function DevModeProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  const toggle = useCallback(() => {
    setIsEnabled(prev => {
      if (prev) {
        // Turning OFF — clear everything
        setSelectedElement(null);
      }
      return !prev;
    });
  }, []);

  const handleSetSelected = useCallback((el: HTMLElement | null) => {
    setSelectedElement(el);
  }, []);

  return (
    <DevModeContext.Provider value={{ isEnabled, toggle, selectedElement, setSelectedElement: handleSetSelected }}>
      {children}
    </DevModeContext.Provider>
  );
}
