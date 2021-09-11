import React, {useMemo} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import useKeywordsValue from '../../Hooks/useKeywordsValue';
import useLocationValue from '../../Hooks/useLocationValue';
import useNewsQuery from '../../Hooks/useNewsQuery';
import NewsItem from '../NewsItem/NewsItem';

const Spacer = styled.View`
  height: 15px;
`;

const NoDataFound = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoDataFoundText = styled.Text`
  font-size: 20px;
  color: white;
`;

function NewsList() {
  const {results, isLoading, refetch} = useNewsQuery();
  const location = useLocationValue();
  const keywords = useKeywordsValue();
  const finalResults = useMemo(
    () =>
      results.filter(
        result =>
          (result.des_facet.indexOf(keywords) !== -1 || keywords === '') &&
          (result.geo_facet.indexOf(location) !== -1 || location === ''),
      ),
    [keywords, location, results],
  );
  const contentContainerStyle = finalResults.length > 0 ? {} : {flex: 1};

  return (
    <FlatList
      data={finalResults}
      renderItem={({item}: any) => <NewsItem {...item} />}
      ItemSeparatorComponent={() => <Spacer />}
      ListHeaderComponent={() => <Spacer />}
      ListFooterComponent={() => <Spacer />}
      showsVerticalScrollIndicator={false}
      refreshing={isLoading}
      onRefresh={refetch}
      contentContainerStyle={contentContainerStyle}
      ListEmptyComponent={() => (
        <NoDataFound>
          {!isLoading && <NoDataFoundText>No Data Found</NoDataFoundText>}
        </NoDataFound>
      )}
    />
  );
}

export default NewsList;
