import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar, Platform
} from "react-native";
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const TvShow = () => {
    const route = useRoute();
    const { catUid, imageUrl, title, description } = route.params;
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [isNavigating, setIsNavigating] = useState(false);
    useEffect(() => {
        const fetchEpisodes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://backend.hayat.ba/vod_cat_${catUid}`);
                setEpisodes(response.data.feed);
            } catch (error) {
                console.error('Failed to fetch episodes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [catUid]);
    const onSwipe = ({ nativeEvent }) => {
        if (nativeEvent.translationX > 100 && !isNavigating) { // Check if not already navigating
            setIsNavigating(true); // Set navigating flag to true
            navigation.goBack();

            setTimeout(() => {
                setIsNavigating(false); // Reset the flag after a delay
            }, 300); // Delay can be adjusted based on your needs
        }
    };
    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

    const renderHeader = () => (

        <View style={styles.header}>
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

            <Image source={{ uri: imageUrl }} style={styles.showImage} />
            <Text style={styles.showTitle}>{title}</Text>
            <Text style={styles.showDescription}>{description}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (


        <FlatList
            style={{ flex: 1, backgroundColor: '#252324' }}
            data={episodes}
            ListHeaderComponent={renderHeader}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.episodeContainer} onPress={() => {
                    navigation.navigate('Uskoro');
                }}>
                    <Image
                        source={{ uri: `https://backend.hayat.ba/vodthumbs/${item.vod_filename}.jpg` }}
                        style={styles.episodeImage}
                    />
                    <Text style={styles.episodeName}>{item.vod_name}</Text>
                </TouchableOpacity>
            )}
        />

    );
};

const styles = StyleSheet.create({
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
    header: {

        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:"#575757",
        paddingBottom:40,
    },
    showImage: {
        width: "100%",
        height: 200,
        resizeMode: 'cover',
    },
    showTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 10,
    },
    showDescription: {
        fontSize: 11,
        color: '#fff',
        textAlign: 'center',
        padding:10
    },
    episodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#575757',
    },
    episodeImage: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
    episodeName: {
        color: "#fff",
        fontSize: 16,
    },
});

export default TvShow;
