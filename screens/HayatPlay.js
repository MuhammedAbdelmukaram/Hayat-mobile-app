import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HayatPlay = () => {
    const navigation = useNavigation();

    const scrollViewRef = useRef();
    const totalWidth = 378 * 2 + 20; // Total content width = width of both cards + marginRight of the first card
    const [activeSection, setActiveSection] = useState(0); // 0 for the first item, 1 for the second item

    const screenWidth = Dimensions.get('window').width;
    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const halfPoint = (totalWidth - screenWidth) / 2;
        setActiveSection(scrollPosition < halfPoint ? 0 : 1);
    };

    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

    return (
        <View style={styles.wrapper}>
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

            <View>
                <Text style={styles.title}>Dobrodošli u Hayat Play</Text>
            </View>

            {/* Use ScrollView for horizontal scrolling */}
            <ScrollView
                style={styles.cardWrapper}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('VODcategories')}>
                    <Image
                        source={require('../assets/Videoteka.png')}
                        style={styles.image}
                        resizeMode={"contain"}
                    />
                    <Text style={styles.heading}>VIDEOTEKA</Text>
                    <Text style={styles.subheading}>Pogledajte ponovo svoje omiljene serije kao sav hayatov sadrzaj u videoteci</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('LiveTV')}>
                    <Image
                        source={require('../assets/Videoteka.png')}
                        style={styles.image}
                        resizeMode={"contain"}
                    />
                    <View style={styles.headingGlow}>
                        <Text style={styles.heading}>LIVE TV</Text>
                    </View>
                    <Text style={styles.subheading}>Otkrijte više omiljenih serija i sadržaja u našoj videoteci</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Custom Scroll Indicator */}
            <View style={styles.indicatorContainer}>
                <View style={styles.indicatorContainer}>
                    {/* Left half indicator */}
                    <View style={[styles.indicatorHalf, activeSection === 0 ? styles.activeIndicator : styles.inactiveIndicator]} />
                    {/* Right half indicator */}
                    <View style={[styles.indicatorHalf, activeSection === 1 ? styles.activeIndicator : styles.inactiveIndicator]} />
                </View>
            </View>
        </View>
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
        marginTop: 30,
        marginBottom: 270, // Adjust if necessary to accommodate the indicator
    },
    card: {
        backgroundColor: "#252324",
        padding: 20,
        alignItems: 'center',
        marginRight: 20,
        width: 378,
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
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontSize: 24,
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
});

export default HayatPlay;
