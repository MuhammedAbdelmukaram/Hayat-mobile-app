
import React, { useState } from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Alert, Platform} from "react-native";
import logo from "../assets/hayatLogo.png";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {setUser} from "../redux/slices/userSlice";
import {useDispatch} from "react-redux";
import {setLoginState} from "../redux/slices/authSlice";
import { API_URL } from '@env';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();



    const handleLogin = async () => {
        setIsSubmitting(true); // Disable the login button
        try {
            const response = await axios.post(`https://backproba.hayat.ba/user/authenticate`, {
                email: email,
                password: password,
                // Add role if needed here
            });
            // Convert token to a string if it's not already one
            const tokenString = String(response.data.token);
            console.log(JSON.stringify(response.data.token, null, 2));


            console.log(tokenString);
            // Save token to secure storage
            await SecureStore.setItemAsync('userToken', tokenString);

            // Immediately retrieve and log the token from secure storage for verification
            const token = await SecureStore.getItemAsync('userToken');
            //console.log('Token stored in secure storage:', token);

            // Assuming you have a login action that sets isLoggedIn to true
            // After storing the token and fetching user info successfully




            const config = {
                headers: { Authorization: `Bearer ${tokenString}` }
            };


            console.log('Sending request with config:', config);


            const userResponse = await axios.get(`${API_URL}/user/whoami`, config);

            dispatch(setUser(userResponse.data));
            dispatch(setLoginState(true));

            console.log(userResponse.data);
            // Navigate to HomeScreen
            navigation.navigate('HomeScreen');
        } catch (error) {
            // Handle error - show error message
            console.error('Login failed', error);
            Alert.alert('Greška', 'Pogriješili ste');
        }
        setIsSubmitting(false); // Re-enable the login button
    };
    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;


    return (
        <View style={styles.container}>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#ffffff" }}>
                <StatusBar
                    translucent
                    backgroundColor="#ffffff"
                    barStyle="light-content"
                />
            </View>
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
            </View>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                disabled={isSubmitting} // Button is disabled when isSubmitting is true
            >
                <Text style={styles.buttonText}>Prijavi se</Text>
            </TouchableOpacity>
            {isSubmitting && <Text style={styles.errorText}>Učitavanje...</Text>}
        </View>
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
        marginTop:"20%",
        width: '50%', // or some other percentage or fixed width
        resizeMode: 'contain', // This will make sure the image is scaled properly
        marginBottom: 20, // Add some margin if needed
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#1A2F5A'
    },
    inputs:{
        marginTop:"30%",
        width:"100%"
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderBottomWidth: 1, // Only have a border on the bottom
        borderColor:'#dadada',
        padding: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#1A2F5A',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginTop: 50,

    },

    errorText: {
        color: 'red',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    registerText: {
        marginTop: 20,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    }
});

export default Login;
