import BottomSheet from '@gorhom/bottom-sheet';
import React, {useRef} from 'react';
import Container from 'src/Components/Container/Container';
import Filters from 'src/Modules/NewsModule/Components/Filters/Filters';
import Header from 'src/Modules/NewsModule/Components/Header/Header';
import KeywordsPickerSheet from 'src/Modules/NewsModule/Components/KeywordsPickerSheet/KeywordsPickerSheet';
import LocationPickerSheet from 'src/Modules/NewsModule/Components/LocationPickerSheet/LocationPickerSheet';
import NewsList from 'src/Modules/NewsModule/Components/NewsList/NewsList';
import SectionList from 'src/Modules/NewsModule/Components/SectionList/SectionList';
import useThemeValue from 'src/Modules/ThemeModule/Hooks/useThemeValue';

function NewsScreen() {
  const theme = useThemeValue();
  const locationSheetRef = useRef<BottomSheet>(null);
  const keywordsSheetRef = useRef<BottomSheet>(null);

  return (
    <Container backgroundColor={theme.colors.accent}>
      <Header />
      <SectionList />
      <Filters
        locationPickerRef={locationSheetRef}
        keywordPickerRef={keywordsSheetRef}
      />
      <NewsList />
      <LocationPickerSheet ref={locationSheetRef} />
      <KeywordsPickerSheet ref={keywordsSheetRef} />
    </Container>
  );
}

export default NewsScreen;
