## useNewsQuery

- This hook is a custom wrapper around react query, and it returns the following response:

```
{
results: RESULT[];
error: AxiosError<any> | null;
refetch: (options?: (RefetchOptions & RefetchQueryFilters<AxiosResponse<NEWS_RESPONSE>>) | undefined) => Promise<any>;
isLoading: boolean;
}
```

- results:
  This is the array of news from the api, it will be used for further filtering and the resultant array will be used for rendering list.
- error:
  This is the standard axios error response, in case api fails due to server error or network error.

- refetch:
  This is the utility method provided by react-query to refresh the current api.

- isLoading:
  This denotes the current state of api, whether it is being called or not.
