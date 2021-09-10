import React from 'react';
import {TextProps, ViewProps} from 'react-native';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import styled from 'styled-components/native';

interface WrapperProps extends ViewProps {
  backgroundColor: string;
}

const Wrapper = styled.View<WrapperProps>`
  height: 55px;
  background-color: ${({backgroundColor}) => backgroundColor};
  justify-content: center;
  padding-left: 15px;
`;

interface TitleProps extends TextProps {
  color: string;
}

const Title = styled.Text<TitleProps>`
  font-size: 24px;
  color: ${({color}) => color};
`;

function Header() {
  const theme = useThemeValue();

  return (
    <Wrapper backgroundColor={theme.colors.primary}>
      <Title color={theme.colors.white}>NYT News Feed</Title>
    </Wrapper>
  );
}

export default Header;
