import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectedCompetitionStyles, styles } from './Styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { getSelectedCompetitionDetail, getTeamIcon } from '../services/Competition.service';
import { Events } from '../models/competition.model';

type RootStackParamList = {
  Home: undefined;
  SelectedCompetition: { itemId: number };
};

type SelectedCompetitionScreenRouteProp = RouteProp<RootStackParamList, 'SelectedCompetition'>;
type SelectedCompetitionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelectedCompetition'>;

type Props = {
  route: SelectedCompetitionScreenRouteProp;
  navigation: SelectedCompetitionScreenNavigationProp;
};
const SelectedCompetition: React.FC<Props> = ({ route }: Props) => {
  const competitionId = route.params.itemId;
  const [selectedCompetitionInfo, setSelectedCompetitionInfo] = useState<Events>();
  useEffect(() => {
    getSelectedCompetitionDetail(competitionId).then((data) => {
      setSelectedCompetitionInfo(data);  

    })  
  }, []);

  return (
    <SafeAreaView style={selectedCompetitionStyles.parentContainer}>
      <View style={selectedCompetitionStyles.selectedCompetitionToolbar}>
      <LinearGradient
        colors={['#003366', '#cc0000',"#000",'#000',"#fff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        locations={[0, 0.25,0.5,0.75,1]}
        style={StyleSheet.absoluteFill}
      />
        <Button
          buttonStyle={{ backgroundColor: "transparent" }}
          icon={<FontAwesomeIcon icon={faArrowLeft} color="white" />}
        />
        <View style={selectedCompetitionStyles.teamInfo}>
        <Image
          style={selectedCompetitionStyles.teamIcon}
          source={{ uri: getTeamIcon(selectedCompetitionInfo?.homeTeam.id) }} />
          <Text style={{color:"white"}}>{selectedCompetitionInfo?.homeTeam.name}</Text>
        </View>
        <View style={selectedCompetitionStyles.scoreInfo}>
          <Text style={selectedCompetitionStyles.scoreInfoText}>0 - 0</Text>
        </View>
        <View style={selectedCompetitionStyles.teamInfo}>
        <Image
          style={selectedCompetitionStyles.teamIcon}
          source={{ uri: getTeamIcon(selectedCompetitionInfo?.awayTeam.id) }} />
          <Text style={{color:"white"}}>{selectedCompetitionInfo?.awayTeam.name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
        <Button
          buttonStyle={{ backgroundColor: "transparent" }}
          icon={<FontAwesomeIcon icon={faShareNodes} color="white" />}
        />
        <Button
          buttonStyle={{ backgroundColor: "transparent" }}
          icon={<FontAwesomeIcon icon={faBell} color="white" />}
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectedCompetition;
