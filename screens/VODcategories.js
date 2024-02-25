import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { PanGestureHandler } from 'react-native-gesture-handler';
const VODcategories = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);
    const fetchVODData = async (catUid = '0') => {
        setLoading(true);
        try {
            const url = `https://backend.hayat.ba/vod_cat_${catUid}`;
            const response = await axios.get(url);
            setData(response.data.feed);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };
    const onSwipe = ({ nativeEvent }) => {
        if (nativeEvent.translationX > 100 && !isNavigating) {
            setIsNavigating(true);
            navigation.goBack();

            setTimeout(() => {
                setIsNavigating(false);
            }, 600); // Adjust the delay as needed
        }
    };
    useEffect(() => {
        // Initially fetch root category
        fetchVODData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Inside VODcategories component
    const renderItem = ({ item }) => {
        const imageUrl = item.cat_pict ? `https://backend.hayat.ba/uploads/tx_ssvodmeta/${item.cat_pict}` : `https://backend.hayat.ba/vodthumbs/${item.vod_filename}.jpg`;
        const title = item.cat_name || item.vod_name;
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                // Inside the onPress function of the renderItem method
                onPress={() => {
                    // Convert to Number if it's a string, otherwise keep it as is. Check if it's truthy (not 0, "0", false, etc.)
                    const hasSub = Boolean(Number(item.cat_hassub));

                    if (hasSub) {
                        // If the category has subcategories
                        navigation.navigate('SubCategory', {
                            catUid: item.cat_uid,
                            imageUrl: item.cat_pict ? `https://backend.hayat.ba/uploads/tx_ssvodmeta/${item.cat_pict}` : `https://backend.hayat.ba/vodthumbs/${item.vod_filename}.jpg`,
                            title: item.cat_name || item.vod_name,
                            description: item.cat_desc || '',
                        });
                    } else {
                        // Navigate to TVShow screen for final content items
                        navigation.navigate('TvShow', {
                            catUid: item.cat_uid,
                            imageUrl: item.cat_pict ? `https://backend.hayat.ba/uploads/tx_ssvodmeta/${item.cat_pict}` : `https://backend.hayat.ba/vodthumbs/${item.vod_filename}.jpg`,
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

    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

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
