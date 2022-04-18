import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigator/Navigation';
import { PermissionsProvider } from './src/context/locationContext/PermissionsContext';

const AppState = ({children}: any) => {

  return(
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}

const App = () => {

  return(
    <>
      <NavigationContainer>
        <AppState>
          <Navigation />
        </AppState>
      </NavigationContainer>
    </>
  )
}

export default App;