import moment from 'moment';
import React from 'react';
import {ImageProps, ViewProps} from 'react-native';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import styled from 'styled-components/native';
import {RESULT} from '../../Types/ResponseTypes';

interface WrapperProps extends ViewProps {
  backgroundColor?: string;
}

interface NewsTextProps extends ViewProps {
  color: string;
}

const Wrapper = styled.View<WrapperProps>`
  padding: 15px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: ${({backgroundColor}) => backgroundColor};
  flex-direction: row;
  border-radius: 10px;
`;

const NewsWrapper = styled.View<WrapperProps>`
  overflow: hidden;
  justify-content: space-between;
  width: 55%;
  margin-left: 15px;
  margin-right: 15px;
`;

const NewsTitle = styled.Text<NewsTextProps>`
  font-size: 18px;
  color: ${({color}) => color};
  margin-bottom: 30px;
`;

const NewsText = styled.Text<NewsTextProps>`
  font-size: 14px;
  color: ${({color}) => color};
`;

const NewsPicture = styled.Image<ImageProps & {backgroundColor: string}>`
  height: 120px;
  width: 120px;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

function NewsItem(props: RESULT) {
  const {title, multimedia, byline, published_date} = props;
  const [picture] = multimedia ?? [];
  const theme = useThemeValue();

  return (
    <Wrapper backgroundColor={theme.colors.surface}>
      <NewsPicture
        backgroundColor={theme.colors.disabled}
        source={{uri: picture?.url}}
      />
      <NewsWrapper>
        <NewsTitle color={theme.colors.onSurface} numberOfLines={2}>
          {title}
        </NewsTitle>
        <NewsText color={theme.colors.onSurface} numberOfLines={1}>
          {byline.replace('By ', 'By: ')}
        </NewsText>
        <NewsText color={theme.colors.onSurface}>
          Published: {moment(published_date).fromNow()}
        </NewsText>
      </NewsWrapper>
    </Wrapper>
  );
}

export default NewsItem;
