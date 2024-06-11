import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectedCompetitionStyles, styles } from './Styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell,faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { getBestPlayers, getIncidents, getLineups, getSelectedCompetitionDetail, getTeamIcon } from '../services/Competition.service';
import { Events } from '../models/competition.model';
import { StartTimeModel, convertEpochToDate, getStatusByCode, isCompetitionLive } from '../helper/utils';
import { BestPlayersSummary } from '../models/best-player-models';
import SelectedCompetitionIncident from './SelectedCompetitionIncident';
import { Incident } from '../models/incidents-model';
import Lineups from './Lineups';
import { LineupsModel } from '../models/lineups.model';

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
  const [bestPlayers, setBestPlayers] = useState<BestPlayersSummary>();
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [startDate,setStartDate] = useState<StartTimeModel>();
  const [incidents,setIncidents] = useState<Incident[]>();
  const [lineups,setLineups] = useState<LineupsModel>();
  const menuButtons = ["Ayrıntılar", "Kadrolar", "Puan Durumu", "İstatistik", "Maçlar"];
  useEffect(() => {
    getSelectedCompetitionDetail(competitionId).then((data) => {
      setSelectedCompetitionInfo(data);
    })
    getIncidents(competitionId).then((data) => {
      setIncidents(data.incidents);
    })
    getLineups(competitionId).then((data) => {
      setLineups(data)
    })
  }, []);

  useEffect(() => {
    getBestPlayers(competitionId).then((data) => {
      setBestPlayers(data);
    })
  }, [competitionId])

  useEffect(() => {
    if(selectedCompetitionInfo?.startTimestamp){
      setStartDate(convertEpochToDate(selectedCompetitionInfo!.startTimestamp))
    }
  },[selectedCompetitionInfo])

  const getDetailBySelectedMenuItem = () => {
    switch(selectedMenuItem){
      case 0:
        return <SelectedCompetitionIncident incidents={incidents!} bestPlayers={bestPlayers!}/>
      case 1:
        return <Lineups />
    }
  }
  
  return (
    selectedCompetitionInfo && (<SafeAreaView style={selectedCompetitionStyles.parentContainer}>
      <View style={selectedCompetitionStyles.selectedCompetitionToolbar}>
        <Button
          buttonStyle={{ backgroundColor: "transparent" }}
          icon={<FontAwesomeIcon icon={faArrowLeft} color="black" />}
        />
        <View style={selectedCompetitionStyles.teamInfo}>
          <Image
            style={selectedCompetitionStyles.teamIcon}
            source={{ uri: getTeamIcon(selectedCompetitionInfo?.homeTeam.id) }} />
          <Text style={selectedCompetitionStyles.teamInfoText}>{selectedCompetitionInfo?.homeTeam.shortName}</Text>
        </View>
        <View style={selectedCompetitionStyles.scoreInfo}>
          <Text style={isCompetitionLive(selectedCompetitionInfo!.status.code) ? styles.liveMinuteInfo : styles.minuteInfo}>
            {getStatusByCode(selectedCompetitionInfo!)}
          </Text>
          {
            selectedCompetitionInfo && selectedCompetitionInfo.status.code === 0 ? <Text style={selectedCompetitionStyles.notStartedInfoText}>{startDate?.hours} : {startDate?.minutes}</Text> :
            <Text style={isCompetitionLive(selectedCompetitionInfo!.status.code) ? selectedCompetitionStyles.liveScoreInfoText : 
              selectedCompetitionStyles.scoreInfoText}>{selectedCompetitionInfo?.homeScore.display} - {selectedCompetitionInfo?.awayScore.display}
            </Text>
          }
        </View>
        <View style={selectedCompetitionStyles.teamInfo}>
          <Image
            style={selectedCompetitionStyles.teamIcon}
            source={{ uri: getTeamIcon(selectedCompetitionInfo?.awayTeam.id) }}/>
          <Text style={selectedCompetitionStyles.teamInfoText}>{selectedCompetitionInfo?.awayTeam.shortName}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Button
            buttonStyle={{ backgroundColor: "transparent" }}
            icon={<FontAwesomeIcon icon={faShareNodes} color="black" />}
          />
          <Button
            buttonStyle={{ backgroundColor: "transparent" }}
            icon={<FontAwesomeIcon icon={faBell} color="black" />}
          />
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={selectedCompetitionStyles.container}>
          {menuButtons.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={[
                selectedCompetitionStyles.menuButtons,
              ]}
              activeOpacity={1}
              onPress={() => setSelectedMenuItem(index)}
            >
              <Text style={selectedCompetitionStyles.buttonText}>{item.toUpperCase()}</Text>
              {selectedMenuItem === index && <View style={selectedCompetitionStyles.indicator} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {getDetailBySelectedMenuItem()}
    </SafeAreaView>
    ));
};

export default SelectedCompetition;
