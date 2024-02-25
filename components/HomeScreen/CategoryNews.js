import React from 'react';
import {StyleSheet, View, Text} from "react-native";
import SingleCategoryNews from "./CategoryNews/SingleCategoryNews";

const CategoryNews = () => {
    return (
        <View style={styles.container}>
            <View style={styles.categoryHeading} >
                <Text style={styles.categoryText}>BIH</Text>

                <SingleCategoryNews/>

            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center',
        height:56
    },
    categoryHeading:{
        alignSelf:"flex-start",
        alignItems:"center",
        justifyContent:"center",
        height:40,
        width:100,
        backgroundColor:"#1A2F5A"
    },
    categoryText:{
        color:"#fff"
    },
    statusBar :{
        color:"#fff"

    },
})

export default CategoryNews;
