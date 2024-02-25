import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {setUser} from "../redux/slices/userSlice";
import {useDispatch} from "react-redux";

const TermsOfService = ({ navigation }) => {


    const dispatch = useDispatch();


    const handleAcceptTerms = async () => {
        try {
            // Retrieve stored user details
            const userDetailsString = await AsyncStorage.getItem('@userDetails');
            const userDetails = JSON.parse(userDetailsString);

            // Perform the signup API call here
            const response = await axios.post(`${API_URL}/user/signup`, {
                email: userDetails.email,
                password: userDetails.password,
                first_name: userDetails.firstName,
                last_name: userDetails.lastName,
                // phoneNumber: userDetails.phoneNumber, // Uncomment if your backend supports phone number
            });

            // ... token storage and user setup ...

            navigation.navigate('Login');
        } catch (error) {
            console.error('Account creation failed:', error);
        }
    };

    return (
        <View>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Terms of Service</Text>
                <Text style={styles.text}>
                    Potvrđujem da imam 18 godina ili više i da sam pročitao/la i da prihvatam Opšte uslove korištenja Hayat d.o.o. Sarajevo. U skladu sa odredbom člana 5. Zakona o zaštiti ličnih/osobnih podataka („Sl. glasnik BiH“ broj 49/06), ovim izjavljujem i aceptiranjem potvrđujem svoju saglasnost da Hayat d.o.o. Sarajevo poduzima sve radnje vezano za obradu mojih ličnih/osobnih podataka i to: ime, prezime, email, a sve u svrhu ućešća za uručivanje poklona.

                    Izjavljujem i aceptiranjem potvrđujem da sam od strane Hayat d.o.o. Sarajevo obaviješten/a o razlozima prikupljanja podataka i davanja ove saglasnosti u skladu sačlanom 22. Zakona o zaštiti ličnih podataka („Sl. glasnik BiH“ broj 49/06). Saglasnost za obradu gore navedenih ličnih/osobnih podataka se daje/odnosi na period do završetka odabira osobe kojoj će biti uručen poklon.

                    Ova Suglasnost se daje u naprijed navedenu svrhu i u druge svrhe se ne može koristiti, a vrijedi do okončanja postupka odabira osobe kojoj će biti uručen poklon. Pod punom materijalnom i krivičnom odgovornošću izjavljujem da su svi upisani podaci istiniti.
                </Text>

                <TouchableOpacity style={styles.button} onPress={handleAcceptTerms}>
                    <Text style={styles.buttonText}>Accept Terms and Create Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A2F5A',
        marginBottom: 20,
    },
    text: {
        fontSize: 13,
        color: '#333',
        lineHeight: 24, // This helps in making text more readable
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#1A2F5A',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export default TermsOfService;
