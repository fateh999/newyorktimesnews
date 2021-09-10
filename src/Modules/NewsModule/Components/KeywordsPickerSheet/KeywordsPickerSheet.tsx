import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {forwardRef, Fragment, useEffect, useMemo, useState} from 'react';
import {FlatList, TextProps, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import styled from 'styled-components/native';
import useKeywordsValue, {setKeywordsValue} from '../../Hooks/useKeywordsValue';
import useNewsQuery from '../../Hooks/useNewsQuery';

interface ListItemTextProps extends TextProps {
  color: string;
}

const ListItem = styled.View`
  padding: 15px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: grey;
`;

const ListItemText = styled.Text<ListItemTextProps>`
  font-size: 18px;
  color: ${({color}) => color};
`;

const ListTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 7.5px;
`;

function KeywordsPickerSheet(_: any, bottomSheetRef: any) {
  const {keywordFilters} = useNewsQuery();
  const insets = useSafeAreaInsets();
  const keywords = useKeywordsValue();
  const theme = useThemeValue();
  const snapPoints = useMemo(() => [0, '50%'], []);

  const [show, setShow] = useState(false);

  useEffect(() => {
    // Temp hack to handle bottom sheet backdrop error in the library
    setTimeout(() => {
      setShow(false);
    }, 300);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={props => (
        <Fragment>
          {show && <BottomSheetBackdrop {...props} closeOnPress={true} />}
        </Fragment>
      )}>
      <ListTitle>Select Keywords</ListTitle>
      <FlatList
        data={keywordFilters}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();
              setKeywordsValue(item);
            }}>
            <ListItem>
              <ListItemText
                color={
                  keywords === item ? theme.colors.primary : theme.colors.text
                }>
                {item}
              </ListItemText>
            </ListItem>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={() => <View style={{height: insets.bottom}} />}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}

export default forwardRef(KeywordsPickerSheet);
