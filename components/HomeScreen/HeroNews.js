import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import newsBackground from '../../assets/news/newsBack-4.png';
import * as Font from 'expo-font';
import fontConfig from '../../util/fonts';

const HeroNews = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync(fontConfig);
            setFontLoaded(true);
        }

        loadFont();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    return (
        <TouchableOpacity activeOpacity={0.9}>
            <View style={styles.container}>
                <ImageBackground
                    source={newsBackground}
                    style={[styles.backgroundImage, { aspectRatio: 16 / 9 }]}
                    resizeMode="cover"
                >
                    {/* Gradient overlay */}
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)','rgba(0, 0, 0, 1)']}
                        locations={[0, 0.8, 1]}
                        style={styles.overlay}
                    />

                    <View style={styles.textDiv}>
                        <Text style={styles.headText}>Gužve na granici usljed ulaska sad Hrvatske u Šengen zonu</Text>
                    </View>

                    {/* Nested div positioned at the bottom */}
                    <View style={styles.nestedDiv}>
                        <View style={styles.SubTextDiv}>
                            <Text style={styles.text}>2 sata</Text>
                        </View>
                        <View style={styles.textImageDiv}>
                            <Text style={styles.text}>42</Text>
                            <Image source={require('../../assets/icons/shareIcon.png')} style={styles.shareIcon} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0,
    },
    backgroundImage: {
        width: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    textDiv: {
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 124,
        marginHorizontal: 14,
    },
    text: {
        color: 'white',
        fontSize: 11,
        marginRight: 6,
    },
    headText: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Blinker-600SemiBold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 20,
        marginBottom: 10,
    },
    SubTextDiv: {},
    shareIcon: {
        height: 12,
        width: 12,
    },
    nestedDiv: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 14,
    },
    textImageDiv: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default HeroNews;
