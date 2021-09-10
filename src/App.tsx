import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from 'react-query';
import NewsScreen from './Screens/News/NewsScreen';
import {queryClient} from './Utils/ReactQueryConfig';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NewsScreen />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
