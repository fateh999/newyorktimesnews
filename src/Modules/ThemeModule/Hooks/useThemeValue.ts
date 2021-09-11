import {useEffect, useState} from 'react';
import ThemeService from '../Services/ThemeService';

// Theme hook using rxjs behavior subject to share theme across whole app
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
