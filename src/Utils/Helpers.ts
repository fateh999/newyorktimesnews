import axios from 'axios';
import {API_URL} from './Constants';
import UltimateConfig from 'react-native-ultimate-config';
import Snackbar from 'react-native-snackbar';
import ThemeService from 'src/Modules/ThemeModule/Services/ThemeService';

axios.defaults.timeout = 3000;

export const fetcher = async (url: string) => {
  return axios.get(`${API_URL}${url}?api-key=${UltimateConfig.API_KEY}`);
};

export const onError = (error: any) => {
  const theme = ThemeService.theme$.getValue();
  if (error?.response) {
    console.log({error: error?.response});
    Snackbar.show({
      text: 'Something went wrong, Please retry',
      backgroundColor: theme.colors.error,
    });
  } else {
    Snackbar.show({
      text: 'Failed to connect with server',
      backgroundColor: theme.colors.error,
    });
    console.log({error});
  }
};
