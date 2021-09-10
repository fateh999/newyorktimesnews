import React from 'react';
import {ViewProps} from 'react-native';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useLocationValue, {setLocationValue} from '../../Hooks/useLocationValue';
import useKeywordsValue, {setKeywordsValue} from '../../Hooks/useKeywordsValue';

interface WrapperProps extends ViewProps {
  backgroundColor: string;
}

const Wrapper = styled.View<WrapperProps>`
  background-color: #24c6dc;
  padding: 15px;
  align-items: center;
  flex-direction: row;
`;

const ButtonWrapper = styled.TouchableOpacity`
  background-color: white;
  padding: 10px;
  flex: 1;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectedButtonWrapper = styled.TouchableOpacity`
  background-color: white;
  padding: 10px;
  flex: 1;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Spacer = styled.View`
  width: 15px;
`;

const FilterText = styled.Text`
  font-size: 16px;
  width: 80%;
`;

function Filters({locationPickerRef, keywordPickerRef}: any) {
  const theme = useThemeValue();
  const location = useLocationValue();
  const keyword = useKeywordsValue();

  return (
    <Wrapper backgroundColor={theme.colors.primary}>
      {location ? (
        <SelectedButtonWrapper
          onPress={() => {
            locationPickerRef.current?.expand();
          }}>
          <FilterText numberOfLines={1}>{location}</FilterText>
          <MaterialCommunityIcons
            name={'close'}
            size={22}
            onPress={() => {
              setLocationValue('');
            }}
          />
        </SelectedButtonWrapper>
      ) : (
        <ButtonWrapper
          onPress={() => {
            locationPickerRef.current?.expand();
          }}>
          <FilterText>LOCATION</FilterText>
          <MaterialCommunityIcons name={'chevron-down'} size={22} />
        </ButtonWrapper>
      )}
      <Spacer />
      {keyword ? (
        <SelectedButtonWrapper
          onPress={() => {
            keywordPickerRef.current?.expand();
          }}>
          <FilterText numberOfLines={1}>{keyword}</FilterText>
          <MaterialCommunityIcons
            name={'close'}
            size={22}
            onPress={() => {
              setKeywordsValue('');
            }}
          />
        </SelectedButtonWrapper>
      ) : (
        <ButtonWrapper
          onPress={() => {
            keywordPickerRef.current?.expand();
          }}>
          <FilterText>KEYWORDS</FilterText>
          <MaterialCommunityIcons name={'chevron-down'} size={22} />
        </ButtonWrapper>
      )}
    </Wrapper>
  );
}

export default Filters;
