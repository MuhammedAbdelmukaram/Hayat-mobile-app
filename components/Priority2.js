import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const Priority2 = ({ image, articleTitle, articleSubtitle, articleID, article }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        // Navigate to the "Article" screen with the articleID
        navigation.navigate('Article', { articleID: articleID });
    };
    const formattedArticleTitle = articleTitle.replace(/\n/g, ' ');
    const formattedArticleSubtitle = articleTitle.replace(/\n/g, ' ');


    useEffect(() => {



    }, );

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.70}>
            <Image
                source={image }
                style={styles.image}
                resizeMode="cover" // Adjust resizeMode as needed
            />
            <View style={styles.textBox}>
                <Text style={styles.titleText}>{formattedArticleTitle}</Text>
            </View>
            <View style={styles.textBoxTwo}>
                <Text style={styles.descriptionText}>{formattedArticleSubtitle}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:'#fff',
        marginBottom:2,
    },
    image: {
        width: '93%', // Adjust the width as needed
        height: 200, // Adjust the height as needed
        marginTop: 16, // Optional: Add spacing between image and text boxes
    },
    textBox: {
        width: '92%', // Adjust the width as needed
        paddingTop: 8, // Adjust vertical padding as needed
        paddingBottom:4,
    },
    textBoxTwo: {
        width: '92%', // Adjust the width as needed
        paddingBottom: 8, // Adjust vertical padding as needed
        marginBottom:4
    },
    titleText: {
        fontSize: 18, // Adjust the font size for the title text
        fontWeight: '500', // Optional: Add font weight
        textAlign: 'left', // Optional: Center the text horizontally
    },
    descriptionText: {
        fontSize: 12, // Adjust the font size for the description text
        textAlign: 'left', // Optional: Center the text horizontally
    },
});

export default Priority2;
