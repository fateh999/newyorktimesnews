import {useEffect, useState} from 'react';
import NewsService from '../Services/NewsService';
import {SECTION} from '../Types/CommonTypes';

function useSectionValue() {
  const [section, setSection] = useState(NewsService.activeSection$.getValue());

  useEffect(() => {
    const subscription = NewsService.activeSection$.subscribe(setSection);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return section;
}

export default useSectionValue;

export const setSectionValue = (value: SECTION) => {
  NewsService.activeSection$.next(value);
  NewsService.activeLocation$.next('');
  NewsService.activeKeywords$.next('');
};
