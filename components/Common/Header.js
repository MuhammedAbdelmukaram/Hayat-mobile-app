import React, {useEffect, useRef, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Alert, Animated,Text} from 'react-native';
import Menu from "./Menu";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const openMenu = () => {
        setMenuVisible(true);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const blinkAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

    useEffect(() => {
        // Blinking animation setup
        Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [blinkAnim]);

    const handleHayatPlayPress = async () => {
        try {
            const response = await axios.get('https://backend.hayat.ba/index.php', {
                params: {
                    id: 'auth',
                    u: 'faris.svrakic@hayat.ba',
                    p: 'hayat24',
                    x: 1, // Assuming x=1 is used to bypass hashing for testing purposes
                }
            });
            if (response.data.auth === 100) {
                // Navigate to HayatPlay screen upon successful authentication
                console.log(response.data.auth);
                navigation.navigate('HayatPlay'); // Replace 'HayatPlay' with your actual screen name
            } else {
                Alert.alert("Authentication Failed", `Auth: ${response.data.auth}`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to authenticate.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={openMenu}>
                <Image
                    source={require('../../assets/icons/menuIcon.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {/* Absolute positioning for the logo to ensure it's always centered */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/hayatLogo.png')}
                    style={styles.headerLogo}
                />
            </View>

            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.buttonLive} onPress={handleHayatPlayPress}>
                    <Animated.View
                        style={{
                            ...styles.blinkingDot,
                            opacity: blinkAnim, // Bind opacity to animated value
                        }}
                    />
               <Text style={{color:"#fff", marginLeft:8}}>Live TV</Text>
                </TouchableOpacity>

            </View>
            <Menu visible={menuVisible} onClose={closeMenu} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#1A2F5A',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 57,
        position: 'relative', // Needed for absolute positioning of children
    },
    logoContainer: {
        position: 'absolute', // Logo is positioned absolutely to ensure it's centered
        left: 0,
        right: 0, // These properties ensure the View is centered
        alignItems: 'center', // This ensures the Image within the View is centered
        height: '100%', // Match the container height to center vertically
        justifyContent: 'center', // Center the logo vertically in the container
    },
    blinkingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
    },
    headerLogo: {
        height: 16,
        width: 78,
    },
    button: {
        paddingHorizontal: 12,
    },
    icon: {
        height: 22,
        width: 22,
    },
    rightContainer: {
        flexDirection: 'row',
        marginRight:8// Ensure icons on the right are laid out horizontally
    },
    buttonLive:{
        paddingHorizontal:12,
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    }
});

export default Header;
