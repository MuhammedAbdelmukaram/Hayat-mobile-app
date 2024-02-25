import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {
    handleFacebookPress,
    handleInstagramPress,
    handleTwitterPress,
    handleYouTubePress
} from "../../util/SocialMediaLinks";

const ShareButtons = () => {
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.iconWrapper} onPress={handleFacebookPress}>
                <Image source={require('../../assets/icons/facebookIcon.png')} style={styles.menuHeaderIcon}>

                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconWrapper} onPress={handleInstagramPress}>
                <Image source={require('../../assets/icons/instagramIcon.png')} style={styles.menuHeaderIcon}>

                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconWrapper} onPress={handleTwitterPress}>
                <Image source={require('../../assets/icons/twitterIcon.png')} style={styles.menuHeaderIcon}>

                </Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconWrapper} onPress={handleYouTubePress}>
                <Image source={require('../../assets/icons/youtubeIcon.png')} style={styles.menuHeaderIcon}>

                </Image>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange children horizontally
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute items evenly
        marginLeft:"10%",
        gap:5
    },
    iconWrapper:{
        backgroundColor: '#1A2F5A',
        borderRadius:50,
        padding:8,
        justifyContent:"center",
        alignItems:"center",
    },

    menuHeaderIcon:{
        height:22,
        width:22,

    },
});

export default ShareButtons;
