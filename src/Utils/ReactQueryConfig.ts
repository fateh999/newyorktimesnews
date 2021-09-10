import {AppState} from 'react-native';
import {focusManager, QueryClient, onlineManager} from 'react-query';
import NetInfo from '@react-native-community/netinfo';
import {createNativePersistor} from 'react-query-native-persist';
import AsyncStorageAdapter from 'react-query-native-persist/dist/adapters/async-storage';
import {persistQueryClient} from 'react-query/persistQueryClient-experimental';
import {onError} from './Helpers';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError,
      cacheTime: Infinity,
    },
    mutations: {
      onError,
    },
  },
});

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(state.isConnected ? true : false);
  });
});

const persistor = createNativePersistor({
  key: 'MY_APP_PERSISTENCE_KEY',
  adapter: new AsyncStorageAdapter(),
});

persistQueryClient({
  queryClient,
  persistor,
});

focusManager.setEventListener((handleFocus: any) => {
  AppState.addEventListener('change', handleFocus);
  return () => {
    AppState.removeEventListener('change', handleFocus);
  };
});
