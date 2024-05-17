import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
    Home: undefined;
    SelectedCompetition: { itemId: number };
  };

  type SelectedCompetitionScreenRouteProp = RouteProp<RootStackParamList, 'SelectedCompetition'>;
  type SelectedCompetitionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelectedCompetition'>;

  type Props = {
    route: SelectedCompetitionScreenRouteProp;
    navigation: SelectedCompetitionScreenNavigationProp;
  };
const SelectedCompetition:React.FC<Props> = ({route}: Props) => {
    const competitionId = route.params.itemId;
    return(
        <View>
            <Text>{competitionId}</Text>
        </View>
    );
};

export default SelectedCompetition;
