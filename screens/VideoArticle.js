import {View, Image, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Platform} from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import video1 from "../assets/news/HayatVideo.mp4";
import {useNavigation, useRoute} from "@react-navigation/native";
import Header from "../components/Common/Header";
import SocialMediaIcons from "../components/Menu/SocialMediaIcons";
import ShareButtons from "../components/Articles/ShareButtons";
import SuggestedNews from "../components/Articles/SuggestedNews";
import {Video} from 'expo-av';
import Reklama1 from "../Presentation Purpose Components/Reklama1";
const VideoArticle = () => {

    const route = useRoute();
    const article = route.params?.article; // Access the passed article object

    useEffect(() => {
        console.log("Article received in VideoArticle:", article);
    }, [article]);


    const video = React.useRef(null);

    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showMuteOverlay, setShowMuteOverlay] = useState(false);

    const toggleMute = () => {
        setIsMuted(prevMuted => !prevMuted);
        setShowMuteOverlay(true);
        setTimeout(() => setShowMuteOverlay(false), 2000); // Hide overlay after 2 seconds
    };

    const togglePlay = () => {
        setIsPlaying(prevPlaying => !prevPlaying);
    };

    const handleVideoPress = () => {
        // Toggle mute on video press
        setIsMuted(prevMuted => !prevMuted);
        setShowMuteOverlay(true);
        setTimeout(() => setShowMuteOverlay(false), 2000); // Hide overlay after 2 seconds
    };

    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

    return (
        <ScrollView >


            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#1A2F5A" }}>
                <StatusBar
                    translucent
                    backgroundColor="#1A2F5A"
                    barStyle="light-content"
                />
            </View>
            <Header />

            <View style={styles.heroImage}>
                <Video
                    ref={video}
                    style={styles.video}
                    source={video1}
                    isMuted={isMuted}
                    shouldPlay={isPlaying}
                    useNativeControls={true}
                    resizeMode="contain"
                    isLooping
                    onPlaybackStatusUpdate={(status) => {
                        setIsPlaying(status.isPlaying);
                    }}
                    onTouchStart={handleVideoPress} // Handle press event on video
                />
                {showMuteOverlay && (
                    <View style={styles.overlay}>
                        {isMuted ? (
                            <Text style={styles.overlayText}>Muted</Text>
                        ) : (
                            <Text style={styles.overlayText}>Unmuted</Text>
                        )}
                    </View>
                )}
            </View>


            <View style={styles.wrapper}>

                <Text style={styles.title}>Sporne pošiljke: Nakon Hrvatske, i Srbija vratila voće iz Malezije</Text>

                <View style={styles.greyContent}>
                    <Text style={styles.author}>Adnan Salaka </Text>

                    <View style={styles.dateTimeWrapper}>
                        <Text style={styles.date}>10.9.2023</Text>
                        <Text style={styles.time}>14:23</Text>
                    </View>
                </View>

                <Text style={styles.subTitle}>Vojna administracija Gabona otvorila je kopnene, morske i zračne granice nakon izvršenog.. </Text>

                <Reklama1/>

                <Text style={styles.text}> Tokom 2025. godine planirana je njegova izgradnja, a s radom bi trebao početi 2026. godine. Bh. strana tvrdi da će
                    iskoristiti sve pravne alate kako bi spriječila Hrvatsku u njenim namjerama. Tokom 2025. godine planirana je njegova izgradnja,
                    a s radom bi trebao početi 2026. godine. Bh. strana tvrdi da će iskoristiti sve pravne alate kako bi spriječila Hrvatsku u njenim namjerama.
                </Text>

                <Text style={styles.text}> Tokom 2025. godine planirana je njegova izgradnja, a s radom bi trebao početi 2026. godine. Bh. strana tvrdi da će
                    iskoristiti sve pravne alate kako bi spriječila Hrvatsku u njenim namjerama. Tokom 2025. godine planirana je njegova izgradnja,
                    a s radom bi trebao početi 2026. godine. Bh. strana tvrdi da će iskoristiti sve pravne alate kako bi spriječila Hrvatsku u njenim namjerama.
                </Text>

                <Text style={styles.text}> Slike Milorada Dodika, Vladimira Putina, majice plaćenićke organizacije Wagner, snajperisti MUP-a RS-a sa zgrada,
                    parole i natpisi 'Granice postoje', skandiranje imena ratnog zločinca...
                </Text>

                <Text style={styles.text}> Tokom 2025. godine planirana je njegova izgradnja, a s radom bi trebao početi 2026. godine. Bh. strana tvrdi da će
                    iskoristiti sve pravne alate kako bi spriječila Hrvatsku u njenim namjerama. Tokom 2025. godine planirana je njegova izgradnja,
                    a s radom bi trebao početi 2026. godine. Bh. strana tvrdi da će iskoristiti sve pravne alate kako bi spriječila Hrvatsku u njenim namjerama.
                </Text>

                <View style={styles.tagsShareWrapper}>
                    <View style={styles.tags}>

                        <TouchableOpacity style={styles.tag}>
                            <Text style={styles.tagText}>Hrvatska</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tag}>
                            <Text style={styles.tagText}>Sengen</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.shareIcons}>
                        <ShareButtons/>
                    </View>

                </View>
            </View>

            <View style={styles.categoryNews}>
                <Text style={styles.categoryTypeText}>Vise iz BiH</Text>

                <View style={styles.suggestedNews}>
                    <SuggestedNews/>
                    <SuggestedNews/>
                    <SuggestedNews/>
                </View>

            </View>

            <View style={styles.otherNews}>
                <Text style={styles.categoryTypeText}>Ostale Vijesti</Text>

                <View style={styles.suggestedNews}>
                    <SuggestedNews/>
                    <SuggestedNews/>
                    <SuggestedNews/>
                </View>

            </View>



        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:'#fff',
    },
    wrapper:{
        paddingHorizontal:8
    },
    video: {
        width: '100%',
        height: undefined,
        aspectRatio: 16 / 9,
        resizeMode:"cover"
    },

    title:{
        fontSize:22,
        fontWeight:'500',
        marginTop:8,
        marginBottom:16,
    },
    greyContent:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:30,
    },

    dateTimeWrapper:{
        flexDirection:"row",
    },
    author:{
        fontSize:12,
        color:"#818181",
        fontWeight:"500"
    },
    date:{
        fontSize:12,
        color:"#818181",
    },
    time:{
        fontSize:12,
        color:"#818181",
        marginLeft:10,
        marginRight:4
    },

    subTitle:{
        fontSize:14,
        fontWeight:'500',
        marginBottom:30,
    },
    text:{
        marginBottom:14
    },
    tags:{
        flexDirection:"row"
    },
    tag:{
        paddingHorizontal:12,
        paddingVertical:5,
        borderRadius:6,
        backgroundColor:"#1a2f5a",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:2,
    },
    tagText:{
        color:"#fff",
        fontSize:12
    },

    tagsShareWrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginTop:26,
        marginBottom:15
    },
    suggestedNews:{
        flexDirection:"row"
    },
    categoryNews:{
        paddingVertical:16,
        backgroundColor:"#e5e5e5",
        paddingHorizontal:8
    },
    categoryTypeText:{
        fontSize:16,
        marginBottom:16,
    },

    otherNews:{
        paddingVertical:16,
        backgroundColor:"#e5e5e5",
        paddingHorizontal:8
    },

    overlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
    },
    overlayText: {
        color: '#fff',
        fontSize: 16,
    },


});
export default VideoArticle;
