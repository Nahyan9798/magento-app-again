import React, { Component } from 'react';
import {StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { ThemeProvider, theme } from './theme';
import { Navigator } from './navigation/Navigator';
import NavigationService from './navigation/NavigationService';
import { onAppStart } from './helper/app';
import { SplashScreen } from './components/common/SplashScreen';
import { Spinner } from './components/common';


onAppStart(store);

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <StatusBar backgroundColor={theme.colors.primaryDark} />

      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <Navigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </PersistGate>
    </ThemeProvider>
  </Provider>
);

export default App;
