import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Uskoro = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#252324' }}>

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image
                        source={require('../assets/backIcon.png')}
                        style={styles.backIcon}
                        resizeMode={"contain"}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.itemNameTwo}>Uskoro</Text>
        </View>
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
    itemNameTwo: {
        alignSelf:"center",
        fontSize: 18,
        fontWeight:"bold",
        color: "#fff",
        padding:6,
        marginTop: 10, // Adds space between the image and the title
    },

    // Your styles here (similar to VODcategories for consistency)
    itemContainer: {
        flex: 1, // Ensures the container takes up full available width
        flexDirection: 'column', // Stack children vertically
        alignItems: 'center', // Center children horizontally
        padding: 10,
        marginTop:16,
        backgroundColor:"#2f2c2c",
        borderBottomWidth: 0,
    },
})
export default Uskoro;