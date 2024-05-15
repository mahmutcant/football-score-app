/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompetitionList from './components/CompetitionList';
import { Provider } from 'react-redux';
import store from './redux/store';
const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  StatusBar.setBackgroundColor('#2C3EC4');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options={{headerShown: false}} name="Home" component={CompetitionList}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
