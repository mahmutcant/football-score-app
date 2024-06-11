import { View, ScrollView, Dimensions } from "react-native"
import { Image, Text } from "react-native-elements"
import { lineupsStyle } from "./Styles/Styles";
import { useState } from "react";

const Lineups = () => {
  const [formationLayer, setFormationLayer] = useState(4);
  const playerContainer = (playerName:string,number:number) => {
    return (
      <View style={{alignItems:"center",marginLeft:10}}>
          <Image
            style={{ width: 36, height: 36}}
            source={{ uri: "https://api.sofascore.app/api/v1/event/12322870/jersey/home/goalkeeper/fancy" }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 17, fontFamily: "SofascoreSans-Bold", position: "absolute",margin:5 }}>{number}</Text>
          <Text style={{ flexWrap: 'wrap', width: 80,textAlign:"center"}}>{playerName}</Text>
        </View>
    )
  }
  return (
    <View style={lineupsStyle.field}>
      <View style={lineupsStyle.halfLine}></View>
      <View style={lineupsStyle.centerCircle}></View>
      <View style={lineupsStyle.goalArea}></View>
      <View style={lineupsStyle.penaltyArea}></View>
      <View style={[lineupsStyle.goalKeeperHomeRow]}>
        <Image
          style={{ width: 30, height: 30, marginTop: 10 }}
          source={{ uri: "https://api.sofascore.app/api/v1/event/12322870/jersey/home/goalkeeper/fancy" }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 17, fontFamily: "SofascoreSans-Bold", position: "absolute" }}>1</Text>
        <Text style={{ position: "absolute", top: 45, zIndex: 5 }}>(c) Fernando Muslera</Text>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, {marginTop:25}]}>
        <View></View>
          {playerContainer("Kaan Ayhan",23)}
          {playerContainer("Davinson Sanchez",6)}
          {playerContainer("Abdülkerim Bardakçı",42)}
          {playerContainer("Derrick Köhn",17)}
        <View></View>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, {marginTop:25}]}>
        <View></View>
          {playerContainer("Lucas Torreira",34)}
          {playerContainer("Berkan Kutlu", 18)}
          
        <View></View>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, {marginTop:25}]}>
        <View></View>
          {playerContainer("Kerem Aktürkoğlu",7)}
          {playerContainer("Dries Mertens",10)}
          {playerContainer("Barış Alper Yılmaz", 53)}
        <View></View>
      </View>
      <View style={[lineupsStyle.defenceHomeRow, {marginTop:25}]}>
        <View></View>
          {playerContainer("Mauro Icardi", 9)}
          
        <View></View>
      </View>
    </View>
  )
}

export default Lineups;