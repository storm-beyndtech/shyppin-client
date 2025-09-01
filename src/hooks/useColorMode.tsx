import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { contextData } from '@/context/AuthContext';

const useColorMode = () => {
  const { setTheme } = contextData();
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'dark');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
    
    setTheme(colorMode)
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
