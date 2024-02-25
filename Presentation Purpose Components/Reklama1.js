import React from 'react';
import {Image, StyleSheet, View} from "react-native";

const Reklama1 = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/reklama/Reklama1.jpg')} style={[styles.newsImage, { aspectRatio: 16 / 9 }]}
                   resizeMode="cover"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        marginBottom:20
    },
    newsImage:{
        width: '100%',
        height:undefined
    },

});

export default Reklama1;
