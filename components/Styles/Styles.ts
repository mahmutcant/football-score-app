import { StyleSheet } from 'react-native';

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
    },
    subMatchTeamsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    timeText: {
        fontSize: 16,
        color: 'black',
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
    teamsContainer: {
        flexDirection: 'column',
        marginRight: 10,
        flex: 1,
    },
    subMatchTeams: {
        color: 'black',
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
