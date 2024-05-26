import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
    },
    scrollViewStyle: {
        padding: 10,
    },
    containerSubMatchInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginLeft:10
    },
    subMatchTeamsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    timeText: {
        fontSize: 16,
        color: 'black',
        fontFamily:'SofascoreSans-Regular',
    },
    timeTextContainer:{
      flexDirection: 'column',
      textAlign: 'center',
      marginRight: 10,
    },
    minuteInfo: {
      fontSize: 16,
      color: 'black',
      textAlign: 'center',
    },
    liveMinuteInfo: {
      fontSize: 16,
      color: '#CB1818',
      textAlign: 'center',
    },
    teamsContainer: {
        flexDirection: 'row',
        marginRight: 10,
        flex: 1,
    },
    subMatchTeams: {
        color: 'black',
        fontSize: 16,
        fontFamily:'SofascoreSans-Regular',
        marginVertical: 2,
    },
    liveSubMatchTeams: {
      color: 'red',
      fontSize: 16,
      fontFamily: 'notoserif',
      marginVertical: 2,
  },
    matchScoreContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    matchScore: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'notoserif',
        alignSelf:'center'
    },
    liveMatchScore: {
      color: 'red',
      fontSize: 16,
      fontFamily: 'notoserif',
    },
    iconButton: {
        backgroundColor:'transparent',
        paddingEnd: 5,
    },
    iconStyle:{
        color: 'gray',
        fontSize: 45,
        paddingEnd: 3,
    },
    teamIcon : {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    statisticIcon:{
      marginEnd: 15,
    }
});

export const firstComponentStyles = StyleSheet.create({
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

export const bottomBarStyles = StyleSheet.create({
  viewBottomBar: {
      height: 60,
      backgroundColor: '#fff',
      justifyContent: 'center',
  },
  iconButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100%',
  },
  iconButtonItem: {
      flexDirection: 'column',
      alignItems: 'center',
  },
  iconButtonText: {
      fontSize: 16,
      color: '#000',
      marginTop: 5,
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  stick: {
    width: '50%',
    borderBottomWidth: 2,
    borderBottomColor: '#374EF6',
},
});

export const selectedCompetitionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  parentContainer: {
    height:'100%',
    backgroundColor:'#EDF0F5'
  },
  selectedCompetitionToolbar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    height: "10%",
    alignItems: 'center',
    position: 'relative',
    backgroundColor:'white'
  },
  teamIconContainer: {
    width: 48,
    height: 48,
  },
  teamIcon : {
    width: 48,
    height: 48,
    aspectRatio: "auto"
  },
  playerIcon:{
    height:50,
    width:50,
    borderRadius:40
  },
  teamInfo:{
    alignItems:'center',
    fontFamily: 'SofascoreSans-Bold',
    fontSize: 12,
  },
  teamInfoText: {
    fontFamily:'SofascoreSans-Bold', 
    color:"black"
  },
  
  scoreInfo:{
    alignItems:'center'
  },
  notStartedInfoText: {
    color:'black',
    fontSize:18,
    fontFamily:'SofascoreSans-Bold'
  },
  scoreInfoText: {
    color:'black',
    fontSize:28,
    fontFamily:'SofascoreSans-Bold'
  },
  liveScoreInfoText: {
    color:'#E50114',
    fontSize:28,
    fontFamily:'SofascoreSans-Bold'
  },
  menuButtons:{
    padding:10,
    backgroundColor:'transparent',
    color:'black'
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontFamily:'SofascoreSans-Regular'
  },
  indicator: {
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'black',
  },
  momentumGraphText:{
    alignSelf:'center',
    fontWeight:'bold'
  },
  momentumGraph:{
    
  },
  bestPlayersContainer:{
    flexDirection: 'row', 
    backgroundColor:'#F5F6FA',
    borderRadius:30,
    
    height:'auto',
    justifyContent: 'space-between'
  },
  bestPlayersStyles: {
    color:'white',
    fontFamily:'SofascoreSans-Regular',
    fontSize:15,
    alignSelf:'center',
    
  },
  bestPlayersTextStyles:{
    color:'#929397',
    fontFamily:'SofascoreSans-Regular',
    fontSize:15
  },
  competitionDetailContainer:{
    alignSelf:'center',
    height:'90%',
    width:Dimensions.get("screen").width - 20,
    marginTop:10,
    backgroundColor:'white',
    borderRadius:10
  }
});