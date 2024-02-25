import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native";

const SuggestedNews = ({ imageSource, headline,articleID,navigation }) => {

    const handlePress = () => {
        // Replace newlines in titles if necessary
        // const formattedHeadline = headline.replace(/\n/g, ' ');
        // Navigate to the "Article" screen with the articleID
        navigation.navigate('Article', { articleID: articleID });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.text}>{headline}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "34.7%"
    },
    image: {
        width: 120,
        height: 85,
        resizeMode: "cover"
    },
    text: {
        width:120,
        fontSize: 12,
        marginTop: 8,
        fontWeight: "500"
    }
});

export default SuggestedNews;
