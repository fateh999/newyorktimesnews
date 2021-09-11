import {useEffect, useState} from 'react';
import ThemeService from '../Services/ThemeService';

function useThemeValue() {
  const [theme, setTheme] = useState(ThemeService.theme$.getValue());

  useEffect(() => {
    const subscription = ThemeService.theme$.subscribe(setTheme);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return theme;
}

export default useThemeValue;

export const getThemeValue = () => ThemeService.theme$.getValue();
