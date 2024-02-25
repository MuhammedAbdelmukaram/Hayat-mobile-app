import React from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from "react-native";
import {
    handleFacebookPress,
    handleInstagramPress,
    handleTwitterPress,
    handleYouTubePress
} from "../../util/SocialMediaLinks";

const SocialMediaIcons = () => {

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.6} onPress={handleFacebookPress}>
                <Image source={require('../../assets/icons/facebookIcon.png')} style={styles.menuHeaderIcon} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={handleInstagramPress}>
                <Image source={require('../../assets/icons/instagramIcon.png')} style={styles.menuHeaderIcon} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={handleTwitterPress}>
                <Image source={require('../../assets/twitterT.png')} style={styles.menuHeaderIcon} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.6} onPress={handleYouTubePress}>
                <Image source={require('../../assets/icons/youtubeIcon.png')} style={styles.menuHeaderIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange children horizontally
        backgroundColor: '#1A2F5A',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribute items evenly
        height: 66,
        marginLeft: "10%"
    },
    menuHeaderIcon: {
        height: 24,
        width: 24,
        marginLeft: 10,
    },
});

export default SocialMediaIcons;
