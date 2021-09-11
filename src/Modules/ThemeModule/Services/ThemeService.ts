import {Appearance, StyleSheet} from 'react-native';
import {BehaviorSubject} from 'rxjs';
import {THEME_TYPE} from '../Types/CommonTypes';
import {DayTheme, NightTheme} from '../Utils/ThemeHelpers';

// ThemeService singleton to store theme and provide other helper methods
class ThemeService {
  theme$;
  create = StyleSheet.create;

  constructor() {
    const colorScheme = Appearance.getColorScheme();
    this.theme$ = new BehaviorSubject<THEME_TYPE>(
      colorScheme === 'dark' ? NightTheme : DayTheme,
    );

    this.handleDynamicChanges();
  }

  handleDynamicChanges = () => {
    Appearance.addChangeListener(({colorScheme}) => {
      if (colorScheme === 'dark') {
        this.theme$.next(NightTheme);
      } else {
        this.theme$.next(DayTheme);
      }
    });
  };
}
export default new ThemeService();
