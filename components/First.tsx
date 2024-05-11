
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Switch } from 'react-native-switch';
const First = () => {
  const [isLiveSelected, setIsLiveSelected] = useState(false);
  /*const buttonCheck = () => {
    console.log("butona bastı");
  }*/
  const changeLiveSelected = () => {
    setIsLiveSelected(!isLiveSelected);
  };
    const styles = StyleSheet.create({
        viewTopBar: {
            flexDirection: 'row',
            height: '28%',
            backgroundColor: '#2C3EC4',
            alignItems: 'center',
        },
        textTopBar: {
            fontSize: 16,
            color: '#fff',
            padding: 10,
        },
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
        switch: {
          alignSelf: 'flex-end',
        },
        inactiveTextStyle: {
          color: 'red',
          fontSize: 11,
        },
        activeTextStyle: {
          color: 'white',
          fontSize: 11,
        },
    });
  return (
    <View
        style={styles.viewTopBar}>
          <Text
          style={styles.textTopBar}>
            Futbol Canlı Skorlar
          </Text>
          <View style={styles.container}>
            <Switch
            backgroundActive="red"
            inactiveTextStyle={styles.inactiveTextStyle}
            activeTextStyle={styles.activeTextStyle}
            backgroundInactive="white"
            barHeight={25}
            circleSize={30}
            activeText="LIVE"
            inActiveText="LIVE"
            onValueChange={changeLiveSelected}
            value={isLiveSelected}/>
          </View>
    </View>
  );
};


export default First;
