import React, { useState } from 'react';
import {
    ScrollView,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    StatusBar,
    Platform
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from "../assets/hayatLogo.png";
import axios from "axios";

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const storeCredentials = async (email, password) => {
        try {
            await AsyncStorage.setItem('@credentials', JSON.stringify({ email, password }));
        } catch (e) {
            // saving error
            console.error('Failed to store credentials:', e);
        }
    };

    const storeUserDetails = async (details) => {
        try {
            await AsyncStorage.setItem('@userDetails', JSON.stringify(details));
        } catch (e) {
            console.error('Failed to store user details:', e);
        }
    };

    const handleSignup = async () => {
        try {
            // Store user details instead of performing API call
            await storeUserDetails({ email, password, firstName, lastName, phoneNumber });
            navigation.navigate('TermsOfService');
        } catch (error) {
            console.error('Failed to proceed to TermsOfService:', error);
        }
    };
    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#ffffff" }}>
                <StatusBar
                    translucent
                    backgroundColor="#ffffff"
                    barStyle="light-content"
                />
            </View>
            <View style={styles.container}>
                <Image source={logo} style={styles.image} />

                <View style={styles.inputs}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor={'#a8a8a8'}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Šifra"
                        secureTextEntry
                        placeholderTextColor={'#a8a8a8'}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setFirstName}
                        value={firstName}
                        placeholder="Ime"
                        placeholderTextColor={'#a8a8a8'}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setLastName}
                        value={lastName}
                        placeholder="Prezime" // Last name in Croatian
                        placeholderTextColor={'#a8a8a8'}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        placeholder="Telefonski broj (neobavezno)" // Phone number (optional) in Croatian
                        placeholderTextColor={'#a8a8a8'}
                        keyboardType="phone-pad"
                    />
                </View>
                <TouchableOpacity onPress={handleSignup} style={styles.button}>
                    <Text style={styles.buttonText}>Registriraj se</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 26,
    },
    image: {
        marginTop: '20%',
        width: '50%',
        resizeMode: 'contain',
        marginBottom: 20,
    },
    inputs: {
        marginTop: '10%', // Reduced the margin-top as compared to the login screen
        width: "100%"
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#dadada',
        padding: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#1A2F5A',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginTop: 30, // Adjusted the margin-top to be closer to the inputs
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    // Removed the registerText and linkText styles as they are not needed in the signup screen
});

export default Signup;
