import {useEffect, useState} from 'react';
import NewsService from '../Services/NewsService';

function useKeywordsValue() {
  const [keywords, setKeywords] = useState(
    NewsService.activeKeywords$.getValue(),
  );

  useEffect(() => {
    const subscription = NewsService.activeKeywords$.subscribe(setKeywords);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return keywords;
}

export default useKeywordsValue;

export const setKeywordsValue = (value: string) => {
  NewsService.activeKeywords$.next(value);
};
