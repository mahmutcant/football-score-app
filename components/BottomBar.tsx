import React from "react";
import { View } from "react-native";
import { bottomBarStyles } from "./Styles/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faClock, faTrophy, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Text } from "react-native-elements";

const BottomBar = () => {
    return(
        <View style={bottomBarStyles.viewBottomBar}>
            <View style={bottomBarStyles.iconButtonContainer}>
                <View style={bottomBarStyles.iconButtonItem}>
                    <FontAwesomeIcon icon={faClock} color="#374EF6" size={20} />
                    <Text style={bottomBarStyles.iconButtonText}>Maçlar</Text>
                    <View style={bottomBarStyles.stick}></View>
                </View>
                <View style={bottomBarStyles.iconButtonItem}>
                    <FontAwesomeIcon icon={faTrophy} color="gray" size={20} />
                    <Text style={bottomBarStyles.iconButtonText}>Ligler</Text>
                </View>
                <View style={bottomBarStyles.iconButtonItem}>
                    <FontAwesomeIcon icon={faBell} color="gray" size={20} />
                    <Text style={bottomBarStyles.iconButtonText}>Favoriler</Text>
                </View>
                <View style={bottomBarStyles.iconButtonItem}>
                    <FontAwesomeIcon icon={faUserCircle} color="gray" size={20} />
                    <Text style={bottomBarStyles.iconButtonText}>Profil</Text>
                </View>
            </View>
            <View style={bottomBarStyles.container}></View>
        </View>

    );
};

export default BottomBar;
