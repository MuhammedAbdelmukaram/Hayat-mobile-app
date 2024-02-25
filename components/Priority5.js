import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Priority5 = ({ image, articleTitle, articleSubtitle, articleID, article }) => {

    const navigation = useNavigation();

    const handlePress = () => {
        // Navigate to the "Article" screen with the articleID
        navigation.navigate('Article', { articleID: articleID });
    };


    const formattedArticleTitle = articleTitle.replace(/\n/g, ' ');



    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>

            <View style={styles.textContainer}>

                <Text style={styles.text}>{formattedArticleTitle}</Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal:4,
        borderRadius:4,
        backgroundColor:'#fff',
        marginBottom:2,
    },
    textContainer:{
        paddingVertical:16,
        paddingHorizontal:16,
        flexDirection:"row"
    },
    text:{
        fontSize:14,
        fontWeight:"500",
        width:"96%"
    },
    image:{
        height:14,
        width:14,
        marginRight:10,
        alignSelf:"center"
    }
})
export default Priority5;
