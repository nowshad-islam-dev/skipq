import { createContext, ReactNode, useContext, useState } from 'react';

type Mode = 'user' | 'business';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

interface ModeProviderProps {
  children: ReactNode;
}

export const ModeProvider = ({ children }: ModeProviderProps) => {
  const [mode, setMode] = useState<Mode>('user');
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }

  return context;
};
