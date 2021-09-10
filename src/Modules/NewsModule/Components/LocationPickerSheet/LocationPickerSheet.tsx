import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import React, {forwardRef, useMemo} from 'react';
import {FlatList, TextProps, View, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';
import styled from 'styled-components/native';
import useLocationValue, {setLocationValue} from '../../Hooks/useLocationValue';
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
  font-size: 16px;
  color: ${({color}) => color};
`;

const ListTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  margin: 7.5px;
`;

function LocationPickerSheet(_: any, bottomSheetRef: any) {
  const {locationFilters} = useNewsQuery();
  const insets = useSafeAreaInsets();
  const location = useLocationValue();
  const theme = useThemeValue();
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      enablePanDownToClose
      index={-1}
      snapPoints={snapPoints}
      backdropComponent={props => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      )}>
      <ListTitle>Select Location</ListTitle>
      <FlatList
        data={locationFilters}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setLocationValue(item);
              bottomSheetRef.current?.close();
            }}>
            <ListItem>
              <ListItemText
                color={
                  location === item ? theme.colors.primary : theme.colors.text
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

export default forwardRef(LocationPickerSheet);
