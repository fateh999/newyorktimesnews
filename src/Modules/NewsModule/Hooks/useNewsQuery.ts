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

  const results = newsResponse?.results ?? [];

  return {
    results,
    error,
    refetch,
    isLoading,
  };
}

export default useNewsQuery;
