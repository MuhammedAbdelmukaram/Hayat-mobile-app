import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    FlatList // For rendering a list of images
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HayatPlay = () => {
    const navigation = useNavigation();
    const [liveTvData, setLiveTvData] = useState([]); // State for live TV data
    const [loading, setLoading] = useState(true);
    const [tvShowsData, setTvShowsData] = useState(true);

    const fetchVODData = async (catUid = '0') => {
        try {
            const url = `https://backend.hayat.ba/vod_cat_${catUid}`;
            const response = await axios.get(url);
            setTvShowsData(response.data.feed);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const fetchLiveTvData = async () => {
        try {
            const response = await axios.get('https://backend.hayat.ba/channels');
            setLiveTvData(response.data.feed); // Store the live TV data
        } catch (error) {
            console.error('Failed to fetch live TV data:', error);
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            await fetchVODData();
            await fetchLiveTvData();
            setLoading(false);
        };
        fetchData();
    }, []);

    // Adjust the width for the container if necessary
    const screenWidth = Dimensions.get('window').width;

    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;

    const chunkData = (data, chunkSize) => {
        let result = [];
        for (let i = 0; i < data.length; i += chunkSize) {
            result.push(data.slice(i, i + chunkSize));
        }
        return result;
    };

    return (
        <ScrollView style={styles.wrapper}>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#cd1717" }}>
                <StatusBar translucent backgroundColor="#cd1717" barStyle="light-content" />
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image source={require('../assets/backIcon.png')} style={styles.backIcon} resizeMode={"contain"} />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.title}>Dobrodošli u Hayat Play</Text>
            </View>

            <View style={[styles.cardWrapper, { width: screenWidth - 40 }]}>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LiveTV', { data: tvShowsData })}>
                    {/* Render images in a 3x2 grid */}
                    {chunkData(liveTvData, 3).map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((item, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: `https://backend.hayat.ba/logos/large/${item.ch}.png` }}
                                    style={styles.channelImage} // Adjust this style as needed
                                    resizeMode="contain"
                                />
                            ))}
                        </View>
                    ))}
                    <View style={styles.headingGlow}>
                        <Text style={styles.heading}>LIVE TV</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('VODcategories', { data: tvShowsData })}
                >
                    <Image source={require('../assets/Videoteka.png')} style={styles.image} resizeMode={"contain"} />
                    <Text style={styles.heading}>VIDEOTEKA</Text>
                </TouchableOpacity>


            </View>

            {/* Display Live TV Channels Images */}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#252324",
        flex: 1,
    },

    indicatorContainer: {
        flexDirection: 'row',
        height: 2,
        width: '100%',
        position: 'absolute',
        bottom: 10,
    },
    channelImage: {
        width: (Dimensions.get('window').width / 2 - 30) / 3 - 10, // Adjust width to fit 3 images in a row, considering padding and margin
        height: 60, // Maintain the aspect ratio or adjust as needed
        resizeMode: 'contain',
    },
    indicatorHalf: {
        flex: 1, // Each half takes up half of the container
        height: 2,
    },
    activeIndicator: {
        backgroundColor: '#cd1717', // Active section color
    },
    inactiveIndicator: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Inactive section color
    },

    container: {
        flexDirection: 'row',
        backgroundColor: '#cd1717',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 57,
    },
    cardWrapper: {
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: 80,
        marginBottom: 270, // Adjust if necessary
    },
    card: {
        backgroundColor: "#252324",
        padding: 20,
        alignItems: 'center',
        marginRight: 20,
        width: (Dimensions.get('window').width / 2) - 30, // Adjusted to half of viewport width - padding
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        marginTop: 30,
    },
    subheading: {
        color: "#fff",
        marginTop: 20,
        textAlign: 'center',
    },
    heading: {
        color: "#fff",
        marginTop: 20,
        width:150,
        paddingVertical: 10,
        fontSize: 17,
        borderWidth: 1,
        borderColor: "#fff",
        textAlign: 'center',
        textShadowColor: 'rgba(255, 255, 255, 0.8)', // Adjust the alpha value for opacity
        textShadowOffset: {width: 0, height: 0}, // Can be adjusted if needed
        textShadowRadius: 10,
    },
    backIcon: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginTop: 5,
        width: 36,
        height: 36,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Adjust as needed to fit your design
        marginBottom: 6.6, // Add some bottom margin to each row
    },


});

export default HayatPlay;
