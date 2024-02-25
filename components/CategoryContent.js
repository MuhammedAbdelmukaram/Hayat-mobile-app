import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import Newsfeed from "./CategoryScreen/newsfeed";

const CategoryContent = () => {
    // Get contentData from Redux store
    const contentData = useSelector((state) => state.selectedContent.contentData);



    return (
        <View style={styles.container}>
            {/* Render contentData here */}
            <View>
                <Newsfeed/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e1e1',
    },
});

export default CategoryContent;
