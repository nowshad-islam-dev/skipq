import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Mode = 'user' | 'business';

interface ModeContextType {
  mode: Mode;
  setModeState: (mode: Mode) => void;
  loading: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

interface ModeProviderProps {
  children: ReactNode;
}

const MODE_KEY = 'APP_MODE';

export const ModeProvider = ({ children }: ModeProviderProps) => {
  const [mode, setMode] = useState<Mode>('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMode = async () => {
      const savedMode = await AsyncStorage.getItem(MODE_KEY);
      if (savedMode === 'business' || savedMode === 'user') {
        setMode(savedMode);
      }
      setLoading(false);
    };
    loadMode();
  }, []);

  const setModeState = async (newMode: Mode) => {
    setMode(newMode);
    await AsyncStorage.setItem(MODE_KEY, newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, setModeState, loading }}>
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
