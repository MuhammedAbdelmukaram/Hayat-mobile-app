import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

const LiveTv = () => {
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
    subCategoryImage: {
        width: "100%", // Use the full width of the screen
        height: 200, // Set a fixed height, or adjust as needed
        resizeMode: 'cover',
        marginBottom: 20, // Add some space before the list starts
    },

    itemImage: {
        width: "100%", // Image takes up the full width of the container
        height: 220, // Fixed height for the image
        // Removed marginRight as it's no longer necessary with vertical stacking
    },
    itemName: {
        alignSelf:"center",
        fontSize: 16,
        color: "#fff",
        padding:6,
        marginTop: 10, // Adds space between the image and the title
    },

    itemNameTwo: {
        alignSelf:"center",
        fontSize: 18,
        fontWeight:"bold",
        color: "#fff",
        padding:6,
        marginTop: 10, // Adds space between the image and the title
    },
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
    // Add more styles as needed
});

export default LiveTv;