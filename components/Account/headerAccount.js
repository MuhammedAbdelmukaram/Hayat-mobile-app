import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const HeaderAccount = () => {
    const navigation = useNavigation(); // Get the navigation object

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()} // Use navigation.goBack() to navigate back
            >
                <Image
                    source={require('../../assets/backIcon.png')}
                    style={styles.backIcon}
                    resizeMode={"contain"}
                />
            </TouchableOpacity>
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
    backIcon: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginTop: 5, width: 36,
        height: 36,
    }
});

export default HeaderAccount;
