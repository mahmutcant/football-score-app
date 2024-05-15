import React, { useEffect, useState } from 'react';
import First from './First';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { getLiveMatchList, getMatchList } from '../services/Competition.service';
import { Events } from '../models/competition.model';
import { convertEpochToDate } from '../helper/utils';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CompetitionList = () => {
    const [competitions, setCompetitions] = useState<Events[]>();
    const [isLiveSelected, setIsLiveSelected] = useState(false);
    const changeLiveSelected = () => {
        setIsLiveSelected(!isLiveSelected);
      };
    useEffect(() => {
        if(isLiveSelected){
            getLiveMatchList().then((data) => {
                const newData = data.filter(item => item.hasEventPlayerStatistics);
                setCompetitions(newData);
            });
        }
        else{
            getMatchList().then((data) => {
                setCompetitions(data);
            });
        }
    }, [isLiveSelected]);
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <First setIsLiveSelected={changeLiveSelected} isLiveSelected={isLiveSelected}/>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                {competitions?.map((filteredItem) => {
                    const date = convertEpochToDate(filteredItem.startTimestamp);
                    return (
                        <View key={filteredItem.id} style={styles.containerSubMatchInfo}>
                            <View style={styles.subMatchTeamsContainer}>
                                <Text style={styles.timeText}>
                                    {(date.hours >= 10 ? date.hours : '0' + date.hours) + ':' + date.minutes}
                                </Text>
                                <View style={styles.teamsContainer}>
                                    <Text style={styles.subMatchTeams}>
                                        <Image
                                            style={styles.teamIcon}
                                            source={{uri: `https://api.sofascore.app/api/v1/team/${filteredItem.homeTeam.id}/image/small`}}/>
                                        {filteredItem.homeTeam.shortName}
                                    </Text>
                                    <Text style={styles.subMatchTeams}>
                                        <Image
                                            style={styles.teamIcon}
                                            source={{uri: `https://api.sofascore.app/api/v1/team/${filteredItem.awayTeam.id}/image/small`}}/>
                                        {filteredItem.awayTeam.shortName}
                                    </Text>
                                </View>
                                {(filteredItem.homeScore.display !== null && filteredItem.homeScore.display !== undefined) ||
                                    (filteredItem.awayScore.display !== null && filteredItem.awayScore.display !== undefined) ? (
                                    <View style={styles.matchScoreContainer}>
                                        <Text style={styles.matchScore}>{filteredItem.homeScore.display}</Text>
                                        <Text style={styles.matchScore}>{filteredItem.awayScore.display}</Text>
                                    </View>
                                ) : <View style={styles.matchScoreContainer}></View>}
                                <Button
                                    buttonStyle={styles.iconButton}
                                    onPress={() => console.log('search')}
                                    icon={
                                        <FontAwesomeIcon
                                        icon={faBell}
                                        style={styles.iconStyle}
                                        />
                                    }
                                    />
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
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
        marginRight: 10,
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

export default CompetitionList;
