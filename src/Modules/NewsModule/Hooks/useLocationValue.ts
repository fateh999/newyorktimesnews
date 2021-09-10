import {useEffect, useState} from 'react';
import NewsService from '../Services/NewsService';

function useLocationValue() {
  const [location, setLocation] = useState(
    NewsService.activeLocation$.getValue(),
  );

  useEffect(() => {
    const subscription = NewsService.activeLocation$.subscribe(setLocation);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return location;
}

export default useLocationValue;

export const setLocationValue = (value: string) => {
  NewsService.activeLocation$.next(value);
};
