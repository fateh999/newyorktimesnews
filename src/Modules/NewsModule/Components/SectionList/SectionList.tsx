import React from 'react';
import {FlatList, Pressable, TextProps, ViewProps} from 'react-native';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import styled from 'styled-components/native';
import useSectionValue, {setSectionValue} from '../../Hooks/useSectionValue';
import {sections} from '../../Utils/Constants';

interface WrapperProps extends ViewProps {
  backgroundColor: string;
}

interface SectionProps extends ViewProps {
  backgroundColor: string;
  borderColor: string;
  border: number;
}

interface TitleProps extends TextProps {
  color: string;
}

const Wrapper = styled.View<WrapperProps>`
  background-color: ${({backgroundColor}) => backgroundColor};
`;

const InnerWrapper = styled.View<WrapperProps>`
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

const Section = styled.View<SectionProps>`
  padding: 10px;
  border-radius: 5px;
  border: ${({border}) => `${border}px`};
  margin-right: 15px;
  width: 120px;
  background-color: ${({backgroundColor}) => backgroundColor};
  border-color: ${({borderColor}) => borderColor};
`;

const Title = styled.Text<TitleProps>`
  font-size: 18px;
  margin-bottom: 15px;
  margin-left: 15px;
  color: ${({color}) => color};
`;

const SectionTitle = styled.Text<TitleProps>`
  font-size: 14px;
  text-transform: capitalize;
  text-align: center;
  color: ${({color}) => color};
`;

const Spacer = styled.View`
  width: 15px;
  height: 15px;
`;

function SectionList() {
  const theme = useThemeValue();
  const activeSection = useSectionValue();

  return (
    <Wrapper backgroundColor={theme.colors.surface}>
      <InnerWrapper backgroundColor={theme.colors.disabled}>
        <Title color={theme.colors.onSurface}>Section</Title>
        <FlatList
          data={sections.slice(0, sections.length / 2 - 1)}
          renderItem={({item}: any) => (
            <Pressable onPress={() => setSectionValue(item)}>
              <Section
                border={activeSection === item ? 2 : 1}
                backgroundColor={theme.colors.surface}
                borderColor={
                  activeSection === item
                    ? theme.colors.primary
                    : theme.colors.onSurface
                }>
                <SectionTitle color={theme.colors.onSurface}>
                  {item}
                </SectionTitle>
              </Section>
            </Pressable>
          )}
          horizontal
          ListHeaderComponent={() => <Spacer />}
          showsHorizontalScrollIndicator={false}
        />
        <Spacer />
        <FlatList
          data={sections.slice(sections.length / 2)}
          renderItem={({item}: any) => (
            <Pressable onPress={() => setSectionValue(item)}>
              <Section
                border={activeSection === item ? 2 : 1}
                backgroundColor={theme.colors.surface}
                borderColor={
                  activeSection === item
                    ? theme.colors.primary
                    : theme.colors.onSurface
                }>
                <SectionTitle color={theme.colors.onSurface}>
                  {item}
                </SectionTitle>
              </Section>
            </Pressable>
          )}
          horizontal
          ListHeaderComponent={() => <Spacer />}
          showsHorizontalScrollIndicator={false}
        />
      </InnerWrapper>
    </Wrapper>
  );
}

export default SectionList;
