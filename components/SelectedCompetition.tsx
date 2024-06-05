import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Image, Text } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectedCompetitionStyles, styles } from './Styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faBell, faFutbol, faFutbolBall, faRepeat, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { getBestPlayers, getIncidents, getSelectedCompetitionDetail, getTeamIcon } from '../services/Competition.service';
import { Events } from '../models/competition.model';
import { DateInformation, StartTimeModel, convertEpochToDate, getStatusByCode, isCompetitionLive, playerColorByRatio } from '../helper/utils';
import { BestPlayersSummary } from '../models/best-player-models';
import { Incident } from '../models/incidents-model';

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
  const [incidents,setIncidents] = useState<Incident[]>();
  const [startDate,setStartDate] = useState<StartTimeModel>();
  const menuButtons = ["Ayrıntılar", "Kadrolar", "Puan Durumu", "İstatistik", "Maçlar"];
  useEffect(() => {
    getSelectedCompetitionDetail(competitionId).then((data) => {
      setSelectedCompetitionInfo(data);
    })
    getIncidents(competitionId).then((data) => {
      setIncidents(data.incidents);
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
  const setElementsByIncident = (item:Incident) => {
    switch(item.incidentType){
      case "card":
        if(item.isHome) {
          return (<View style={selectedCompetitionStyles.isHomeContainer}>
            <View style={{margin:5}}>
            <View style={{width:20,height:20,backgroundColor:'#d9af00'}}></View>
            <Text>{item.time}'</Text>
            </View>
            <View style={{width:1,height:35, backgroundColor:'black', margin:5}}></View>
            <Text style={{fontFamily:"SofascoreSans-Regular",fontSize:15,margin:5}}>{item.player?.shortName}</Text>
          </View>)
        }
        else{
          return (<View style={selectedCompetitionStyles.isAwayContainer}>
            <Text style={{fontFamily:"SofascoreSans-Regular",fontSize:15,margin:5}}>{item.player?.shortName}</Text>
            <View style={{width:1,height:35, backgroundColor:'black', margin:5}}></View>
            <View style={{margin:5}}>
            <View style={{width:20,height:20,backgroundColor:'#d9af00'}}></View>
            <Text style={{margin:5}}>{item.time}'</Text>
            </View>
          </View>)
        }
      case "substitution":
        if(item.isHome){
          return (<View style={selectedCompetitionStyles.substitutionIsHome}>
            <View style={{marginTop:5}}>
              <FontAwesomeIcon color='blue' icon={faRepeat}/>
              <Text>{item.time}'</Text>
            </View>
            <Text style={{margin:5}}>{item.player?.shortName}</Text>
            <View style={{width:1,height:35, backgroundColor:'black', margin:5}}></View>
            <View style={{marginLeft:10}}>
              <Text style={{fontFamily:"SofascoreSans-Regular",fontSize:15, color:"#191919"}}>Giren: {item.playerIn?.shortName}</Text>
              <Text style={{fontFamily:"SofascoreSans-Regular",fontSize:14, color:"#9C9C9C"}}>Çıkan: {item.playerOut?.shortName}</Text>
            </View>
          </View>)
        }
        return (<View style={selectedCompetitionStyles.substitutionIsAway}>
          <View style={{marginRight:10}}>
            <View style={{marginLeft:10}}>
                <Text style={{fontFamily:"SofascoreSans-Regular",fontSize:15, color:"#191919"}}>Giren: {item.playerIn?.shortName}</Text>
                <Text style={{fontFamily:"SofascoreSans-Regular",fontSize:14,color:"#9C9C9C"}}>Çıkan: {item.playerOut?.shortName}</Text>
            </View>
          </View>
          <Text style={{margin:5}}>{item.player?.shortName}</Text>
          <View style={{width:1,height:35, backgroundColor:'black', margin:5}}></View>
          <View style={{margin:10}}>
            <FontAwesomeIcon color='blue' icon={faRepeat}/>
            <Text>{item.time}'</Text>
          </View>
        </View>)
      case "goal":
        if(item.isHome){
          return (<View style={selectedCompetitionStyles.substitutionIsHome}>
            <View style={{margin:5}}>
              {item.from === "penalty" ? <Text>(P)</Text> : <FontAwesomeIcon color='green' icon={faFutbol}/>}
              <Text>{item.time}'</Text>
            </View>
            <View style={{width:1,height:35, backgroundColor:'black', margin:5}}></View>
            <View style={{margin:5}}>
              <Text>{item.player?.shortName}</Text>
              {item.assist1 && (<Text style={{fontFamily:"SofascoreSans-Regular",fontSize:14,color:"#9C9C9C"}}>Asist: {item.assist1?.shortName}</Text>)}
            </View>
          </View>);
        }else {
          return (<View style={selectedCompetitionStyles.substitutionIsAway}>
            <View style={{margin:5}}>
              <Text style={{alignSelf:'flex-end'}}>{item.player?.shortName}</Text>
              {item.from === "penalty" && <Text>(P)</Text>}
              {item.assist1 && (<Text style={{fontFamily:"SofascoreSans-Regular",fontSize:14,color:"#9C9C9C"}}>Asist: {item.assist1?.shortName}</Text>)}
            </View>
            <View style={{width:1,height:35, backgroundColor:'black', margin:5}}></View>
            <View style={{margin:5}}>
              {item.from === "penalty" ? <Text>(P)</Text> : <FontAwesomeIcon color='green' icon={faFutbol}/>}
              <Text>{item.time}'</Text>
            </View>
          </View>);
        }
        return(<View></View>);
      default: 
        null
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
              <View style={{width:35,height:35,justifyContent:'center',backgroundColor:playerColorByRatio(bestPlayers.bestHomeTeamPlayers[0].value)}}>
                <Text style={selectedCompetitionStyles.bestPlayersStyles}>{bestPlayers.bestHomeTeamPlayers[0].value}</Text>
              </View>
              <Text style={{color:'#929397',fontFamily:'SofascoreSans-Regular',fontSize:15}}>{bestPlayers.bestHomeTeamPlayers[0].player.shortName}</Text>
            </View>
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
              <View style={{width:35,height:35,justifyContent:'center',backgroundColor:playerColorByRatio(bestPlayers.bestAwayTeamPlayers[0].value),alignSelf:'flex-end'}}>
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
          <View style={{width:Dimensions.get('screen').width - 10, backgroundColor:'#F5F6FA',borderRadius:35,alignItems:'center',alignSelf:'center'}}>
            {incidents && incidents.map((item) => (
              setElementsByIncident(item)
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    ));
};

export default SelectedCompetition;
