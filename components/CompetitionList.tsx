import React, { useEffect, useState } from 'react';
import First from './First';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { getLiveMatchList, getMatchList } from '../services/Competition.service';
import { Events } from '../models/competition.model';
import { convertEpochToDate, getMatchMinutesInfo, getTodayDate } from '../helper/utils';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';
import { styles } from './Styles/Styles';

const CompetitionList = () => {
    const [competitions, setCompetitions] = useState<Events[]>();
    const isLiveSelected = useSelector((state:any) => state.customReducer.isLiveSelected);
    useEffect(() => {
        if(isLiveSelected){
            getLiveMatchList().then((data) => {
                const newData = data.filter(item => item.hasEventPlayerStatistics);
                setCompetitions(newData);
        });
        }
        else{
            getMatchList().then((data) => {
                const newData = data.filter(item => item.hasEventPlayerStatistics && convertEpochToDate(item.startTimestamp).day === getTodayDate().day);
                setCompetitions(newData);
            });
        }
    }, [isLiveSelected]);
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <First/>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                {competitions?.map((filteredItem) => {
                    const date = convertEpochToDate(filteredItem.startTimestamp);
                    return (
                        <View key={filteredItem.id} style={styles.containerSubMatchInfo}>
                            <View style={styles.subMatchTeamsContainer}>
                                <View style={styles.timeTextContainer}>
                                    <Text style={styles.timeText}>
                                        {(date.hours >= 10 ? date.hours : '0' + date.hours) + ':' + date.minutes}
                                    </Text>
                                    <Text style={styles.minuteInfo}>
                                        {filteredItem.status.code === 100 ? 'MS' : filteredItem.status.code === 31 ?
                                        'IY' : getMatchMinutesInfo(filteredItem.time, filteredItem.lastPeriod)}
                                    </Text>
                                </View>
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
                                        <Text style={!isLiveSelected ? styles.matchScore : styles.liveMatchScore}>{filteredItem.homeScore.display}</Text>
                                        <Text style={!isLiveSelected ? styles.matchScore : styles.liveMatchScore}>{filteredItem.awayScore.display}</Text>
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


export default CompetitionList;
