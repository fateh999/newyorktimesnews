import {AxiosError, AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import NewsService from '../Services/NewsService';
import {NEWS_RESPONSE} from '../Types/ResponseTypes';
import useSectionValue from './useSectionValue';

function useNewsQuery() {
  const section = useSectionValue();

  const {data, error, isLoading, refetch} = useQuery<
    AxiosResponse<NEWS_RESPONSE>,
    AxiosError<any>
  >(NewsService.queryKeys.loadNews(section), () =>
    NewsService.loadNews(section),
  );

  const newsResponse = data?.data;
  const locationFilters: Array<string> = Array.from(
    new Set(
      (newsResponse?.results ?? [])
        .map(({geo_facet}) => [...geo_facet])
        .reduce((a: any, b: any) => a.concat(b), [])
        .filter((_: any) => _),
    ),
  );
  const keywordFilters: Array<string> = Array.from(
    new Set(
      (newsResponse?.results ?? [])
        .map(({des_facet}) => [...des_facet])
        .reduce((a: any, b: any) => a.concat(b), [])
        .filter((_: any) => _),
    ),
  );

  const results = newsResponse?.results ?? [];

  return {
    results,
    error,
    refetch,
    isLoading,
    newsResponse,
    locationFilters,
    keywordFilters,
  };
}

export default useNewsQuery;
