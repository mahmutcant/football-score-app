import React, { useEffect, useState } from 'react';
import First from './First';
import { SafeAreaView, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { getLiveMatchList, getMatchList, getTeamIcon } from '../services/Competition.service';
import { Events } from '../models/competition.model';
import { compareByLeagueOrder, convertEpochToDate, getStatusByCode, isCompetitionLive } from '../helper/utils';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';
import { styles } from './Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
    Home: undefined;
    SelectedCompetition: { itemId: number };
  };

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const CompetitionList = () => {
    const [competitions, setCompetitions] = useState<Events[]>();
    const isLiveSelected = useSelector((state: any) => state.customReducer.isLiveSelected);

    const navigation = useNavigation<HomeScreenNavigationProp>();
    const fetchLiveMatches = async () => {
        try {
            const data = await getLiveMatchList();
            setCompetitions(data);
        } catch (error) {
            console.error('Error fetching live matches:', error);
        }
    };

    const fetchTodayMatches = async () => {
        try {
            const data = await getMatchList();
            //const newData = data.filter(item => convertEpochToDate(item.startTimestamp).day === getTodayDate().day);
            setCompetitions(data);
        } catch (error) {
            console.error('Error fetching today matches:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isLiveSelected) {
                await fetchLiveMatches();
            } else {
                await fetchTodayMatches();
            }
        };

        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 9999999999);

        return () => clearInterval(intervalId);
    }, [isLiveSelected]);

    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <First />
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
                {competitions?.slice(0,100).sort(compareByLeagueOrder).map((filteredItem) => {
                    const date = convertEpochToDate(filteredItem.startTimestamp);
                    return (
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor ="#DDDDDD"
                            onPress={() => navigation.navigate('SelectedCompetition', { itemId: filteredItem.id })}>
                            <View key={filteredItem.id} style={styles.containerSubMatchInfo}>
                                <View style={styles.subMatchTeamsContainer}>
                                    <View style={styles.timeTextContainer}>
                                        <Text style={styles.timeText}>
                                            {(date.hours >= 10 ? date.hours : '0' + date.hours) + ':' + date.minutes}
                                        </Text>
                                        <Text style={isCompetitionLive(filteredItem.status.code) ? styles.liveMinuteInfo : styles.minuteInfo}>
                                            {getStatusByCode(filteredItem)}
                                        </Text>
                                    </View>
                                    <View style={styles.teamsContainer}>
                                        <Text style={styles.subMatchTeams}>
                                            <Image
                                                style={styles.teamIcon}
                                                source={{ uri: getTeamIcon(filteredItem.homeTeam.id) }} />
                                            {filteredItem.homeTeam.shortName}
                                        </Text>
                                        <Text style={styles.subMatchTeams}>
                                            <Image
                                                style={styles.teamIcon}
                                                source={{ uri: getTeamIcon(filteredItem.awayTeam.id) }} />
                                            {filteredItem.awayTeam.shortName}
                                        </Text>
                                    </View>
                                    {(filteredItem.homeScore.display !== null && filteredItem.homeScore.display !== undefined) ||
                                        (filteredItem.awayScore.display !== null && filteredItem.awayScore.display !== undefined) ? (
                                        <View style={styles.matchScoreContainer}>
                                            <Text style={filteredItem.status.code === 100 || 60 ? styles.matchScore : styles.liveMatchScore}>{filteredItem.homeScore.display}</Text>
                                            <Text style={filteredItem.status.code === 100 || 60 ? styles.matchScore : styles.liveMatchScore}>{filteredItem.awayScore.display}</Text>
                                        </View>
                                    ) : null}
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
                        </TouchableHighlight>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};


export default CompetitionList;
