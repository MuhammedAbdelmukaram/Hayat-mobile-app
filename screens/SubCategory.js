import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image, Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import axios from 'axios';

const SubCategory = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { catUid, imageUrl, title } = route.params; // Assume imageUrl is also passed via params

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubCategoryData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://backend.hayat.ba/vod_cat_${catUid}`);
            setData(response.data.feed);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch subcategory data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubCategoryData();
    }, [catUid]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const renderItem = ({ item }) => {
        const itemImageUrl = `https://backend.hayat.ba/uploads/tx_ssvodmeta/${item.cat_pict || item.vod_pict}`;
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    navigation.navigate('SubTvShow', {
                        catUid: item.cat_uid,
                        imageUrl: `https://backend.hayat.ba/uploads/tx_ssvodmeta/${item.cat_pict || item.vod_pict}`,
                        title: item.cat_name || item.vod_name,
                        description: item.cat_desc || '',
                    });
                }}
            >
                <Image source={{ uri: itemImageUrl }} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.cat_name || item.vod_name}</Text>
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
            <ScrollView style={{width:"100%"}}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                        <Image
                            source={require('../assets/backIcon.png')}
                            style={styles.backIcon}
                            resizeMode={"contain"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Display the official subcategory image here */}
                <Image source={{ uri: imageUrl }} style={styles.subCategoryImage}  />
                <Text style={styles.itemNameTwo}>{title}</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    // To ensure FlatList does not scroll separately
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    // Your styles here (similar to VODcategories for consistency)
    itemContainer: {
        flex: 1, // Ensures the container takes up full available width
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center children horizontally
        padding: 10,
        marginTop:16,
        backgroundColor:"#2f2c2c",
        borderBottomWidth: 0,
    },
    subCategoryImage: {
        width: "100%", // Use the full width of the screen
        height: 200, // Set a fixed height, or adjust as needed
        resizeMode: 'cover',
        marginBottom: 20, // Add some space before the list starts
    },

    itemImage: {
        width: "100%", // Image takes up the full width of the container
        height: 220, // Fixed height for the image
        // Removed marginRight as it's no longer necessary with vertical stacking
    },
    itemName: {
        alignSelf:"center",
        fontSize: 16,
        color: "#fff",
        padding:6,
        marginTop: 10, // Adds space between the image and the title
    },

    itemNameTwo: {
        alignSelf:"center",
        fontSize: 18,
        fontWeight:"bold",
        color: "#fff",
        padding:6,
        marginTop: 10, // Adds space between the image and the title
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#cd1717',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 57,
        width:"100%",
        paddingHorizontal: 10,
    },
    backIcon: {
        width: 36,
        height: 36,
    },
    // Add more styles as needed
});

export default SubCategory;
