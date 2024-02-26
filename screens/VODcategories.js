import React from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const VODcategories = ({ route }) => {
    const { data } = route.params; // Receive the data passed through route params
    const navigation = useNavigation();


    const renderItem = ({ item }) => {
        const imageUrl = item.cat_pict ? `https://backend.hayat.ba/uploads/tx_ssvodmeta/${item.cat_pict}` : `https://backend.hayat.ba/vodthumbs/${item.vod_filename}.jpg`;
        const title = item.cat_name || item.vod_name;
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    const hasSub = Boolean(Number(item.cat_hassub));
                    if (hasSub) {
                        navigation.navigate('SubCategory', {
                            catUid: item.cat_uid,
                            imageUrl,
                            title: item.cat_name || item.vod_name,
                            description: item.cat_desc || '',
                        });
                    } else {
                        navigation.navigate('TvShow', {
                            catUid: item.cat_uid,
                            imageUrl,
                            title: item.cat_name || item.vod_name,
                            description: item.cat_desc || '',
                        });
                    }
                }}
            >
                <Image source={{ uri: imageUrl }} style={styles.itemImage} />
                <Text style={styles.itemName}>{title}</Text>
            </TouchableOpacity>
        );
    };

    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;

    return (
        <View style={{ flex: 1, backgroundColor: '#252324' }}>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#cd1717" }}>
                <StatusBar
                    translucent
                    backgroundColor="#cd1717"
                    barStyle="light-content"
                />
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image
                        source={require('../assets/backIcon.png')}
                        style={styles.backIcon}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </View>

            <View style={{padding:20}}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#cd1717',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 57,
        paddingHorizontal: 10,
    },
    backIcon: {
        width: 36,
        height: 36,
    },
    itemContainer: {
        flex: 1, // Ensures the container takes up full available width
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center children horizontally
        padding: 10,
        marginTop:16,
        backgroundColor:"#2f2c2c",
        borderBottomWidth: 0, // Optional: Adds a separator line between items
         // Optional: Color for the separator line
    },
    itemImage: {
        width: "100%", // Image takes up the full width of the container
        height: 220, // Fixed height for the image
        // Removed marginRight as it's no longer necessary with vertical stacking
    },
    itemName: {
        fontSize: 16,
        color: "#fff",
        padding:6,
        marginTop: 10, // Adds space between the image and the title
    },
});

export default VODcategories;
