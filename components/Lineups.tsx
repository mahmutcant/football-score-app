import { View, ScrollView, Dimensions } from "react-native"
import { Image, Text } from "react-native-elements"
import { lineupsStyle, selectedCompetitionStyles } from "./Styles/Styles";
import React, { useEffect, useState } from "react";
import { LineupsModel } from "../models/lineups.model";
import { playerColorByRatio } from "../helper/utils";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFutbol, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { Incident } from "../models/incidents-model";

interface ChildProps {
  linupsDetail: LineupsModel,
  eventId: number,
  substitute: Incident[],
  goals: Incident[]
}

const Lineups: React.FC<ChildProps> = React.memo(({ linupsDetail, eventId, substitute, goals}) => {
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

  const playerContainer = (layerNumber: number, startNumber: number, home: boolean) => {
    if (home) {
      let rowDetail = []
      for (let i = 0; i < homeFormationLayer![layerNumber]; i++) {
        const isSubtitute = substitute.find(x => x.playerOut?.slug === linupsDetail.home.players[i + startNumber].player.slug) !== undefined
        const isScored = goals.find(x => x.player?.slug === linupsDetail.home.players[i + startNumber].player.slug) !== undefined
        rowDetail.push(<View style={{ alignItems: "center", marginLeft: 10 }}>
          <View style={{ flexDirection: "column" }}>
            {isSubtitute && <FontAwesomeIcon style={{ top: isScored ? 40 : 25, left: 2 }} color='blue' icon={faRepeat} />}
            {isScored && <FontAwesomeIcon style={{ top: 55, left: 55 }} color='green' icon={faFutbol}/>}
            <View style={{ width: 20, height: 20, top: 30, marginRight: 60, backgroundColor: playerColorByRatio(linupsDetail.home.players[i + startNumber].statistics?.rating) }}>
              <Text style={selectedCompetitionStyles.bestPlayersStylesInLineups}>{linupsDetail.home.players[i + startNumber].statistics?.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Image
            style={{ width: 36, height: 36 }}
            source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/home/player/fancy` }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 20, fontFamily: "SofascoreSans-BoldCondensed", position: "absolute", margin: 5, marginTop:  (isScored && isSubtitute) ? 55 : (isSubtitute || isScored) ? 40 : 22, color: `#${linupsDetail.home.playerColor.fancyNumber}` }}>{linupsDetail.home.players[i + startNumber].jerseyNumber}</Text>
          <Text style={{ flexWrap: 'wrap', width: 65, textAlign: "center", fontSize: 12, fontFamily: "SofascoreSans-Medium" }}>{linupsDetail.home.players[i + startNumber].captain ? "(c)" : null} {linupsDetail.home.players[i + startNumber].player.name}</Text>
        </View>)
      }
      return rowDetail;
    }
    let rowDetail = []
    for (let i = 0; i < awayFormationLayer![layerNumber]; i++) {
      const isSubtitute = substitute.find(x => x.isHome === false && x.playerOut?.slug === linupsDetail.away.players[i + startNumber].player.slug) !== undefined
      const isScored = goals.find(x => x.player?.slug === linupsDetail.home.players[i + startNumber].player.slug) !== undefined      
      rowDetail.push(<View style={{ alignItems: "center", marginLeft: 10 }}>
        <View style={{ flexDirection: "column" }}>
          {isSubtitute && <FontAwesomeIcon style={{ top: 25, left: 2 }} color='blue' icon={faRepeat} />}
          {isScored && <FontAwesomeIcon style={{ top: 55, left: 55 }} color='green' icon={faFutbol}/>}
          <View style={{ width: 20, height: 20, top: 30, marginRight: 60, backgroundColor: playerColorByRatio(linupsDetail.away.players[i + startNumber].statistics?.rating) }}>
            <Text style={selectedCompetitionStyles.bestPlayersStylesInLineups}>{linupsDetail.away.players[i + startNumber].statistics?.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Image
          style={{ width: 36, height: 36, marginBottom: isSubtitute ? 16 : 0 }}
          source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/away/player/fancy` }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 20, fontFamily: "SofascoreSans-BoldCondensed", position: "absolute", marginTop: (isSubtitute || isScored) ? 41 : 22, margin: 5, color: `#${linupsDetail.away.playerColor.fancyNumber}` }}>{linupsDetail.away.players[i + startNumber].jerseyNumber}</Text>
        <Text style={{ flexWrap: 'wrap', width: 75, textAlign: "center", fontSize: 14, fontFamily: "SofascoreSans-Medium", top: isSubtitute ? -16 : 0 }}>{linupsDetail.away.players[i + startNumber].captain ? "(c)" : null} {linupsDetail.away.players[i + startNumber].player.name}</Text>
      </View>)
    }
    return home ? rowDetail : rowDetail.reverse();

  }
  return (
    homeFormationLayer && <ScrollView >
      <View style={lineupsStyle.field}>
        <View style={lineupsStyle.halfLine}></View>
        <View style={lineupsStyle.centerCircle}></View>
        <View style={lineupsStyle.goalArea}></View>
        <View style={lineupsStyle.penaltyArea}></View>
        <View style={[lineupsStyle.goalKeeperHomeRow]}>
          <Image
            style={{ width: 30, height: 30, marginTop: 10 }}
            source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/home/goalkeeper/fancy` }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 18, top: 22, fontFamily: "SofascoreSans-Bold", position: "absolute", color: `#${linupsDetail.home.goalkeeperColor.fancyNumber}` }}>{linupsDetail.home.players[0].jerseyNumber}</Text>
          <Text style={{ position: "absolute", fontFamily: "SofascoreSans-Medium", top: 50, zIndex: 5 }}>{linupsDetail.home.players[0].captain ? "(c)" : null} {linupsDetail.home.players[0].player.name}</Text>
        </View>
        <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 15 }]}>
          <View></View>
          {homeFormationLayer && playerContainer(0, 1, true)}
          <View></View>
        </View>
        <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 12 }]}>
          <View></View>
          {homeFormationLayer && playerContainer(1, (1 + homeFormationLayer[0]), true)}
          <View></View>
        </View>
        <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 12 }]}>
          <View></View>
          {homeFormationLayer && playerContainer(2, (1 + homeFormationLayer[0] + homeFormationLayer[1]), true)}
          <View></View>
        </View>
        {homeFormationLayer.length > 3 && <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 35 : 32 }]}>
          <View></View>
          {homeFormationLayer && playerContainer(3, (1 + homeFormationLayer[0] + homeFormationLayer[1] + homeFormationLayer[2]), true)}
          <View></View>
        </View>}

        {/* AWAY*/}

        <View style={lineupsStyle.goalAreaAway}></View>
        <View style={lineupsStyle.penaltyAreaAway}></View>
        {awayFormationLayer!.length > 3 && <View style={[lineupsStyle.defenceHomeRow]}>
          <View></View>
          {awayFormationLayer && playerContainer(3, (1 + awayFormationLayer[0] + awayFormationLayer[1] + awayFormationLayer[2]), false)}
          <View></View>
        </View>}
        <View style={[lineupsStyle.defenceHomeRow, { marginTop: homeFormationLayer!.length < 4 ? 55 : 0 }]}>
          <View></View>
          {awayFormationLayer && playerContainer(2, (1 + awayFormationLayer[0] + awayFormationLayer[1]), false)}
          <View></View>
        </View>
        <View style={[lineupsStyle.defenceHomeRow, { marginTop: awayFormationLayer!.length < 4 ? 55 : 15 }]}>
          <View></View>
          {awayFormationLayer && playerContainer(1, (1 + awayFormationLayer[0]), false)}
          <View></View>
        </View>
        <View style={[lineupsStyle.defenceHomeRow, { marginTop: awayFormationLayer!.length < 4 ? 30 : 5 }]}>
          <View></View>
          {awayFormationLayer && playerContainer(0, 1, false)}
          <View></View>
        </View>
        <View style={[lineupsStyle.goalKeeperHomeRow, { top: 20 }]}>
          <Text style={{ position: "absolute", fontFamily: "SofascoreSans-Medium", bottom: 50, zIndex: 5 }}>{linupsDetail.away.players[0].captain ? "(c)" : null} {linupsDetail.away.players[0].player.name}</Text>
          <Image
            style={{ width: 30, height: 30,marginBottom:10}}
            source={{ uri: `https://api.sofascore.app/api/v1/event/${eventId}/jersey/away/goalkeeper/fancy` }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 17, top: 10, fontFamily: "SofascoreSans-Bold", position: "absolute", color: `#${linupsDetail.away.goalkeeperColor.fancyNumber}` }}>{linupsDetail.away.players[0].jerseyNumber}</Text>
        </View>
      </View>
    </ScrollView>
  )
})

export default Lineups;