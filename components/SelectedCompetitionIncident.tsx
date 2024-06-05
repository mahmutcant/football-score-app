import { Dimensions, View } from "react-native"
import { Image, Text } from "react-native-elements"
import { ScrollView } from "react-native-gesture-handler"
import { selectedCompetitionStyles } from "./Styles/Styles"
import { Incident } from "../models/incidents-model"
import { BestPlayersSummary } from "../models/best-player-models"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faFutbol, faRepeat } from "@fortawesome/free-solid-svg-icons"
import { playerColorByRatio } from "../helper/utils"
import { useEffect, useState } from "react"
import { getIncidents } from "../services/Competition.service"

const SelectedCompetitionIncident = (competitionId:any,bestPlayers:BestPlayersSummary) => {
    const [incidents,setIncidents] = useState<Incident[]>();
    useEffect(() => {
        getIncidents(competitionId).then((data) => {
            setIncidents(data.incidents);
          })
    }, [])
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
                <View style={{width:20,height:20,backgroundColor: item.incidentClass === "red" ? '#C7361F' : "#d9af00"}}></View>
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
          case "period":
            return (<View style={{width:"100%", backgroundColor:"#fff",alignItems:'center'}}>
              <Text style={{color:"black", fontFamily:"SofascoreSans-Bold"}}>{item.text === "HT" ? "IY" : "MS"} {item.homeScore}-{item.awayScore}</Text>
            </View>);
          default: 
            null
        }
      }
    return(
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
    )
}

export default SelectedCompetitionIncident;