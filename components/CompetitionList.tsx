import React, { useEffect, useState } from 'react';
import First from './First';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { getMatchList } from '../services/Competition.service';
import { Events } from '../models/competition.model';

const CompetitionList = () => {
    const [competitions, setCompetitions] = useState<Events[]>();
    useEffect(() => {
        getMatchList().then((data) => {
            setCompetitions(data);
        });
    }, [competitions]);

    const convertEpochToDate = (unix_timestamp:number) => {
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = '0' + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
    };
    const styles = StyleSheet.create({
        matchInfo: {
            color: 'black',
            padding: 10,
            fontSize: 12,
        },
        subMatchInfo:{
            color: 'black',
            padding: 10,
            fontSize: 12,
            fontFamily: 'notoserif',
        },
        safeAreaStyle: {
            height: Dimensions.get('window').height,
        },
        scrollViewStyle: {
            flexGrow: 1,
        },
        matchName: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        container: {
            marginBottom: 10,
        },
    });
    return(
        <SafeAreaView style={styles.safeAreaStyle}>
    <First/>
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {competitions
            ?.filter(item => item.tournament.category.slug === 'turkey')
                .map((filteredItem, index) => (
                    <View>
                        <Text style={styles.matchInfo} key={index}>
                            {filteredItem.tournament.name}
                        </Text>
                        <Text style={styles.subMatchInfo}>
                        {convertEpochToDate(filteredItem.startTimestamp)} {filteredItem.homeTeam.shortName} - {filteredItem.awayTeam.shortName}
                        </Text>
                    </View>
                ))}
        </ScrollView>
    </SafeAreaView>
    );
};

export default CompetitionList;
