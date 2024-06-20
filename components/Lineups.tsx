import { View, ScrollView, Dimensions } from "react-native"
import { Image, Text } from "react-native-elements"
import { lineupsStyle } from "./Styles/Styles";
import React, { useEffect, useState } from "react";
import { LineupsModel } from "../models/lineups.model";

interface ChildProps {
  linupsDetail: LineupsModel,
  eventId: number
}

const Lineups: React.FC<ChildProps> = React.memo(({ linupsDetail, eventId }) => {
  const [homeFormationLayer, setHomeFormationLayer] = useState<number[]>();
  const [awayFormationLayer, setAwayFormationLayer] = useState<number[]>();
  useEffect(() => {
    const unformattionArrayHome = linupsDetail.home.formation.split("-")
    const formattedHomeFormationHome = unformattionArrayHome.map(str => parseInt(str, 10))
    const unformattionArrayAway = linupsDetail.away.formation.split("-")
    const formattedHomeFormationAway = unformattionArrayAway.map(str => parseInt(str, 10))
    setHomeFormationLayer(formattedHomeFormationHome)
    setAwayFormationLayer(formattedHomeFormationAway)
  }, [linupsDetail])
  const playerContainer = (layerNumber: number, startNumber: number,home:boolean) => {
    if(home){
      let rowDetail = []
    for (let i = 0; i < homeFormationLayer![layerNumber]; i++) {
      rowDetail.push(<View style={{ alignItems: "center", marginLeft: 10 }}>
        <Image
          style={{ width: 36, height: 36 }}
          source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/home/player/fancy` }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 18, fontFamily: "SofascoreSans-Bold", position: "absolute", margin: 5, color: `#${linupsDetail.home.playerColor.fancyNumber}` }}>{linupsDetail.home.players[i + startNumber].jerseyNumber}</Text>
        <Text style={{ flexWrap: 'wrap', width: 65, textAlign: "center", fontSize: 12, fontFamily: "SofascoreSans-Bold" }}>{linupsDetail.home.players[i + startNumber].captain ? "(c)" : null} {linupsDetail.home.players[i + startNumber].player.name}</Text>
      </View>)
    }
    return rowDetail;
    }
    let rowDetail = []
    for (let i = 0; i < awayFormationLayer![layerNumber]; i++) {
      rowDetail.push(<View style={{ alignItems: "center", marginLeft: 10 }}>
        <Image
          style={{ width: 36, height: 36 }}
          source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/away/player/fancy` }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 18, fontFamily: "SofascoreSans-Bold", position: "absolute", margin: 5, color: `#${linupsDetail.away.playerColor.fancyNumber}` }}>{linupsDetail.away.players[i + startNumber].jerseyNumber}</Text>
        <Text style={{ flexWrap: 'wrap', width: 65, textAlign: "center", fontSize: 12, fontFamily: "SofascoreSans-Bold" }}>{linupsDetail.away.players[i + startNumber].captain ? "(c)" : null} {linupsDetail.away.players[i + startNumber].player.name}</Text>
      </View>)
    }
    return home ? rowDetail : rowDetail.reverse();
    
  }
  return (
    homeFormationLayer && <ScrollView style={lineupsStyle.field}>
      <View style={lineupsStyle.halfLine}></View>
      <View style={lineupsStyle.centerCircle}></View>
      <View style={lineupsStyle.goalArea}></View>
      <View style={lineupsStyle.penaltyArea}></View>
      <View style={[lineupsStyle.goalKeeperHomeRow]}>
        <Image
          style={{ width: 30, height: 30, marginTop: 0 }}
          source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/home/goalkeeper/fancy` }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 17, top: 15, fontFamily: "SofascoreSans-Bold", position: "absolute", color: `#${linupsDetail.home.goalkeeperColor.fancyNumber}` }}>{linupsDetail.home.players[0].jerseyNumber}</Text>
        <Text style={{ position: "absolute", fontFamily: "SofascoreSans-Bold", top: 37, zIndex: 5 }}>{linupsDetail.home.players[0].captain ? "(c)" : null} {linupsDetail.home.players[0].player.name}</Text>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 20 }]}>
        <View></View>
        {homeFormationLayer && playerContainer(0, 1, true)}
        <View></View>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 12 }]}>
        <View></View>
        {homeFormationLayer && playerContainer(1, (1 + homeFormationLayer[0]),true)}
        <View></View>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 12 }]}>
        <View></View>
        {homeFormationLayer && playerContainer(2, (1 + homeFormationLayer[0] + homeFormationLayer[1]),true)}
        <View></View>
      </View>
      {homeFormationLayer.length > 3 && <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 32 }]}>
        <View></View>
        {homeFormationLayer && playerContainer(3, (1 + homeFormationLayer[0] + homeFormationLayer[1] + homeFormationLayer[2]),true)}
        <View></View>
      </View>}
      
      {/* AWAY*/}

      <View style={lineupsStyle.goalAreaAway}></View>
      <View style={lineupsStyle.penaltyAreaAway}></View>
      {awayFormationLayer!.length > 3 && <View style={[lineupsStyle.defenceHomeRow, { marginTop: awayFormationLayer!.length < 4 ? 65 : 32 }]}>
        <View></View>
        {awayFormationLayer && playerContainer(3, (1 + awayFormationLayer[0] + awayFormationLayer[1] + awayFormationLayer[2]),false)}
        <View></View>
      </View>}
      <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 15 }]}>
        <View></View>
        {awayFormationLayer && playerContainer(2, (1 + awayFormationLayer[0] + awayFormationLayer[1]),false)}
        <View></View>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, { marginTop: awayFormationLayer!.length < 4 ? 35 : 15 }]}>
        <View></View>
        {awayFormationLayer && playerContainer(1, (1 + awayFormationLayer[0]),false)}
        <View></View>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, { marginTop: awayFormationLayer!.length < 4 ? 35 : 15 }]}>
        <View></View>
        {awayFormationLayer && playerContainer(0, 1, false)}
        <View></View>
      </View>
      <View style={[lineupsStyle.goalKeeperHomeRow, {top:15}]}>
      <Text style={{ position: "absolute", fontFamily: "SofascoreSans-Bold", top: 3, zIndex: 5 }}>{linupsDetail.away.players[0].captain ? "(c)" : null} {linupsDetail.away.players[0].player.name}</Text>
        <Image
          style={{ width: 30, height: 30, marginTop: 10 }}
          source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/away/goalkeeper/fancy` }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 17, top: 20, fontFamily: "SofascoreSans-Bold", position: "absolute", color: `#${linupsDetail.home.goalkeeperColor.fancyNumber}` }}>{linupsDetail.away.players[0].jerseyNumber}</Text>
      </View>
    </ScrollView>
  )
})

export default Lineups;