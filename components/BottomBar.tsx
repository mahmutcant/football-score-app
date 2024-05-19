import React from 'react';
import { View } from 'react-native';
import { bottomBarStyles } from './Styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faClock, faTrophy, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Text } from 'react-native-elements';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface bottomBarElement{
    text: string;
    icon: IconProp;
    isSelected: boolean;
}
const BottomBar = () => {
    const bottomBarElements: bottomBarElement[] = [
        {icon : faClock,text:'Maçlar',isSelected:true},
        {icon : faTrophy,text:'Ligler',isSelected:false},
        {icon : faBell,text:'Favoriler',isSelected:false},
        {icon : faUserCircle,text:'Profil',isSelected:false},
    ];
    return(
        <View style={bottomBarStyles.viewBottomBar}>
            <View style={bottomBarStyles.iconButtonContainer}>
                {bottomBarElements.map((item,index) => (
                    <View key={index} style={bottomBarStyles.iconButtonItem}>
                        <FontAwesomeIcon icon={item.icon} color={item.isSelected ? '#374EF6' : 'gray'} size={20} />
                        <Text style={bottomBarStyles.iconButtonText}>{item.text}</Text>
                        {item.isSelected && <View style={bottomBarStyles.stick}></View>}
                    </View>))}
            </View>
        </View>
    );
};
export default BottomBar;
