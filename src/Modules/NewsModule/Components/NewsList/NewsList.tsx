import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import useKeywordsValue from '../../Hooks/useKeywordsValue';
import useLocationValue from '../../Hooks/useLocationValue';
import useNewsQuery from '../../Hooks/useNewsQuery';
import NewsItem from '../NewsItem/NewsItem';

const Spacer = styled.View`
  height: 15px;
`;

function NewsList() {
  const {results, isLoading, refetch} = useNewsQuery();
  const location = useLocationValue();
  const keywords = useKeywordsValue();

  return (
    <FlatList
      data={results.filter(
        result =>
          (result.des_facet.indexOf(keywords) !== -1 || keywords === '') &&
          (result.geo_facet.indexOf(location) !== -1 || location === ''),
      )}
      renderItem={({item}: any) => <NewsItem {...item} />}
      ItemSeparatorComponent={() => <Spacer />}
      ListHeaderComponent={() => <Spacer />}
      ListFooterComponent={() => <Spacer />}
      showsVerticalScrollIndicator={false}
      refreshing={isLoading}
      onRefresh={refetch}
    />
  );
}

export default NewsList;
