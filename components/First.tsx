
import { Button } from 'react-native-elements';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Switch } from 'react-native-switch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
      height: 60,
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
    iconButton: {
      backgroundColor:'transparent',
      paddingEnd: 30,
    },
    iconStyle:{
      color: 'white',
      fontSize: 45,
      paddingEnd: 10,
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
          value={isLiveSelected} />
      </View>
      <Button
          onPress={() => console.log('search')}
          buttonStyle={styles.iconButton}
          icon={
            <FontAwesomeIcon
              icon={faSearch}
              style={styles.iconStyle}
            />
          }
        />
    </View>
  );
};


export default First;
