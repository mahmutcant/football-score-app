import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectedCompetitionStyles, styles } from './Styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { getBestPlayers, getSelectedCompetitionDetail, getTeamIcon } from '../services/Competition.service';
import { Events } from '../models/competition.model';
import { getStatusByCode, isCompetitionLive, playerColorByRatio } from '../helper/utils';
import { BestPlayersSummary } from '../models/best-player-models';

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
  const menuButtons = ["Ayrıntılar", "Kadrolar", "Puan Durumu", "İstatistik", "Maçlar"];
  useEffect(() => {
    getSelectedCompetitionDetail(competitionId).then((data) => {
      setSelectedCompetitionInfo(data);
    })
  }, []);

  useEffect(() => {
    getBestPlayers(competitionId).then((data) => {
      setBestPlayers(data);
    })
  }, [competitionId])

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
          <Text style={isCompetitionLive(selectedCompetitionInfo!.status.code) ? selectedCompetitionStyles.liveScoreInfoText : selectedCompetitionStyles.scoreInfoText}>{selectedCompetitionInfo?.homeScore.display} - {selectedCompetitionInfo?.awayScore.display}</Text>
        </View>
        <View style={selectedCompetitionStyles.teamInfo}>
          <Image
            style={selectedCompetitionStyles.teamIcon}
            source={{ uri: getTeamIcon(selectedCompetitionInfo?.awayTeam.id) }} />
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
      <ScrollView>
        <Text style={selectedCompetitionStyles.momentumGraphText}>En iyi Oyuncular</Text>
        <View style={selectedCompetitionStyles.momentumGraph}>
        </View>
        <View style={{backgroundColor:'white'}}>
        {bestPlayers && 
          <View style={selectedCompetitionStyles.bestPlayersContainer}>
            <View style={{flexDirection:'row'}}>
            <Image
                  style={selectedCompetitionStyles.playerIcon}
                  source={{ uri: `https://api.sofascore.app/api/v1/player/${bestPlayers.bestHomeTeamPlayers[0].player.id}/image` }} />
            <View style={{flexDirection:'column'}}>
              <View style={{width:30,height:30,justifyContent:'center',backgroundColor:playerColorByRatio(bestPlayers.bestHomeTeamPlayers[0].value)}}>
                <Text style={selectedCompetitionStyles.bestPlayersStyles}>{bestPlayers.bestHomeTeamPlayers[0].value}</Text>
              </View>
              <Text style={{color:'#929397',fontFamily:'SofascoreSans-Regular',fontSize:15}}>{bestPlayers.bestHomeTeamPlayers[0].player.shortName}</Text>
            </View>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
              <View style={{width:30,height:30,justifyContent:'center',backgroundColor:playerColorByRatio(bestPlayers.bestAwayTeamPlayers[0].value),alignSelf:'flex-end'}}>
                <Text style={selectedCompetitionStyles.bestPlayersStyles}>{bestPlayers.bestAwayTeamPlayers[0].value}</Text>
              </View>
              <Text style={selectedCompetitionStyles.bestPlayersTextStyles}>{bestPlayers.bestAwayTeamPlayers[0].player.shortName}</Text>
            </View>
            <Image
                  style={selectedCompetitionStyles.playerIcon}
                  source={{ uri: `https://api.sofascore.app/api/v1/player/${bestPlayers.bestAwayTeamPlayers[0].player.id}/image` }} />
            </View>
          </View>
        }
        </View>
        <View style={selectedCompetitionStyles.competitionDetailContainer}>
          <View style={{width:Dimensions.get('screen').width - 10, backgroundColor:'#F5F6FA',borderRadius:30,alignItems:'center',alignSelf:'center'}}>
            <Text style={{color:'#222327',fontWeight:'bold'}}>FT 2 - 3</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    ));
};

export default SelectedCompetition;
