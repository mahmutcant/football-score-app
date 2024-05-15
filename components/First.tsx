
import { Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Switch } from 'react-native-switch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch} from 'react-redux';
import { dispatchIsLiveSelected } from '../redux/actions';
import { firstComponentStyles } from './Styles/Styles';
const First = () => {
  const [isLiveSelected, setIsLiveSelected] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dispatchIsLiveSelected(isLiveSelected));
  }, [isLiveSelected,dispatch]);
  
  return (
    <View
      style={firstComponentStyles.viewTopBar}>
      <Text
        style={firstComponentStyles.textTopBar}>
        Futbol Canlı Skorlar
      </Text>
      <View style={firstComponentStyles.container}>
        <Switch
          backgroundActive="red"
          inactiveTextStyle={firstComponentStyles.inactiveTextStyle}
          activeTextStyle={firstComponentStyles.activeTextStyle}
          backgroundInactive="white"
          barHeight={25}
          circleSize={30}
          activeText="LIVE"
          inActiveText="LIVE"
          onValueChange={(value) => setIsLiveSelected(value)}
          value={isLiveSelected} />
      </View>
      <Button
          onPress={() => console.log('search')}
          buttonStyle={firstComponentStyles.iconButton}
          icon={
            <FontAwesomeIcon
              icon={faSearch}
              style={firstComponentStyles.iconStyle}
            />
          }
        />
    </View>
  );
};


export default First;
