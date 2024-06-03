import React, { useEffect, useState } from 'react';
import First from './First';
import { ActivityIndicator, ListRenderItem, Platform, SafeAreaView, ScrollView, TouchableHighlight, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { getLiveMatchList, getMatchList, getTeamIcon } from '../services/Competition.service';
import { Events } from '../models/competition.model';
import { compareByLeagueOrder, convertEpochToDate, getStatusByCode, getTodayDate, isCompetitionLive } from '../helper/utils';
import { faBell, faChartSimple, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useSelector } from 'react-redux';
import { styles } from './Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import BottomBar from './BottomBar';
import { GestureHandlerRootView, PanGestureHandler, State, PanGestureHandlerStateChangeEvent, FlatList } from 'react-native-gesture-handler';

type RootStackParamList = {
    Home: undefined;
    SelectedCompetition: { itemId: number };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const CompetitionList = () => {
    const [competitions, setCompetitions] = useState<Events[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const todayDate = getTodayDate();
    let selectedDay = todayDate.day;
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

    const handleStateChange = (event: PanGestureHandlerStateChangeEvent) => {
        const { nativeEvent } = event;
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX > 0) {
                selectedDay -= 1;
                console.log(selectedDay);
            } else if (nativeEvent.translationX < 0) {
                selectedDay += 1;
                console.log(selectedDay);
            }
        }
    };

    const fetchTodayMatches = async () => {
        try {
            const data = await getMatchList(todayDate);
            //const newData = data.filter(item => convertEpochToDate(item.startTimestamp).day === todayDate.day);
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
        }, 99999999);

        return () => clearInterval(intervalId);
    }, [isLiveSelected]);

    const loadMoreData = () => {
        if (loading) return;
        setLoading(true);
        const newData = competitions.slice((page - 1) * 10, page * 10);
        setCompetitions(prevData => [...prevData, ...newData]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

    const renderItem: ListRenderItem<Events> = ({ item }) => {
        const date = convertEpochToDate(item.startTimestamp);
        return (
            <TouchableHighlight
                key={item.id}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => navigation.navigate('SelectedCompetition', { itemId: item.id })}>
                <View style={styles.containerSubMatchInfo}>
                    <View style={styles.subMatchTeamsContainer}>
                        <View style={styles.timeTextContainer}>
                            <Text style={styles.timeText}>
                                {(date.hours >= 10 ? date.hours : '0' + date.hours) + ':' + date.minutes}
                            </Text>
                            <Text style={isCompetitionLive(item.status.code) ? styles.liveMinuteInfo : styles.minuteInfo}>
                                {getStatusByCode(item)}
                            </Text>
                        </View>
                        <View>
                            <View style={styles.teamsContainer}>
                                <Image
                                    style={styles.teamIcon}
                                    source={{ uri: getTeamIcon(item.homeTeam.id) }}
                                    resizeMode="contain"
                                />
                                <Text style={isCompetitionLive(item.status.code) ? styles.liveSubMatchTeams : styles.subMatchTeams}>
                                    {item.homeTeam.shortName}
                                </Text>
                            </View>
                            <View style={styles.teamsContainer}>
                                <Image
                                    style={styles.teamIcon}
                                    source={{ uri: getTeamIcon(item.awayTeam.id) }}
                                    resizeMode="contain"
                                />
                                <Text style={isCompetitionLive(item.status.code) ? styles.liveSubMatchTeams : styles.subMatchTeams}>
                                    {item.awayTeam.shortName}
                                </Text>
                            </View>
                        </View>
                        </View>
                        {item.hasEventPlayerStatistics && <FontAwesomeIcon
                            style={styles.statisticIcon}
                            icon={faChartSimple}
                            color='green'
                        />}
                        {(item.homeScore.display !== null && item.homeScore.display !== undefined) ||
                            (item.awayScore.display !== null && item.awayScore.display !== undefined) ? (
                            <View style={styles.matchScoreContainer}>
                                <Text style={isCompetitionLive(item.status.code) ? styles.liveMatchScore : styles.matchScore}>{item.homeScore.display}</Text>
                                <Text style={isCompetitionLive(item.status.code) ? styles.liveMatchScore : styles.matchScore}>{item.awayScore.display}</Text>
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
            </TouchableHighlight>
        );
    };

    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <First />
            <GestureHandlerRootView>
                <PanGestureHandler activeOffsetX={[-20, 20]} onHandlerStateChange={handleStateChange}>
                    <FlatList
                        data={compareByLeagueOrder(competitions).slice(0,50)}
                        renderItem={renderItem}
                        keyExtractor={(item,index) => index.toString()}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </PanGestureHandler>
            </GestureHandlerRootView>
            <BottomBar />
        </SafeAreaView>
    );
};



export default CompetitionList;
