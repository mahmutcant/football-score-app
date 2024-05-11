/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
} from 'react-native';
import { StatusBar } from 'react-native';
import First from './components/First';


function App(): React.JSX.Element {
  StatusBar.setBackgroundColor('#2C3EC4')
  return (
    <View>
      <First/>
    </View>
  );
}

export default App;
