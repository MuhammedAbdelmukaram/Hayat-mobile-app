import React, {useState} from 'react';
import {Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Header from "../components/Common/Header";
import Countdown from "../components/Survey/Countdown";
import shareButton from "../assets/icons/shareIconBlack.png"
const Survey = ({ surveyId }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = ['1990', '1991', '1992', '1993'];

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };




    // Your JSON object
    const surveyData = {
        "_id": {
            "$oid": "6580226dd6f5d61365282f34"
        },
        "question": "Jesu li u Srbiji nakon izbora moguće promjene?",
        "answerOptions": [
            {
                "answer": "Da",
                "count": 19
            },
            {
                "answer": "Ne",
                "count": 123
            }
        ],
        "surveyType": "survey",
        "correctAnswer": -1,
        "totalCount": 142,
        "deadline": {
            "$date": "2023-12-24T16:15:00.000Z"
        }
    };

    const deadlineISO = surveyData.deadline.$date;

    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

    return (
        <View style={styles.container}>
            {/*
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#1A2F5A" }}>
                <StatusBar
                    translucent
                    backgroundColor="#1A2F5A"
                    barStyle="light-content"
                />
            </View>

            <View style={styles.surveyOuterContainer}>

                <View style={styles.surveyContainer}>


                    <View style={styles.blueSectionWrapper}>
                        <View style={styles.blueSection}>

                            <Text style={styles.surveyHeading}>Poklon moze biti tvoj</Text>
                            <Countdown deadline={deadlineISO} />
                            {console.log(deadlineISO)}

                        </View>

                        <Image
                            source={shareButton }
                            style={styles.image}
                            resizeMode="contain"
                        />
                    </View>

                <Text style={styles.questionText}>{surveyData.question}</Text>
                {surveyData.answerOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionContainer,
                            selectedOption === option.answer && styles.selectedOption,
                        ]}
                        onPress={() => handleSelectOption(option.answer)}
                    >
                        <Text style={styles.optionText}>{option.answer}</Text>
                    </TouchableOpacity>
                ))}

                </View>
            </View>
*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:20,
        backgroundColor: 'transparent', // Replace with your background color
    },
    blueSection:{
        width:"80%",
        paddingHorizontal:20,
        paddingVertical:16,
        marginBottom:20,
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"row",
        backgroundColor:"#1A2F5A",

    },
    image:{
        height:20,
        alignSelf:"center",
        marginBottom:20
    },
    whiteTriangleLeft: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 30, // Width of the left triangle
        borderTopWidth: 50, // Height of the triangle
        borderRightColor: '#FFF',
        borderTopColor: 'transparent',
    },
    whiteTriangleRight: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 30, // Width of the right triangle
        borderTopWidth: 50, // Height of the triangle
        borderLeftColor: '#FFF',
        borderTopColor: 'transparent',
    },
    surveyHeading:{
        color:"#fff"
    },
    blueSectionWrapper:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",

    },
    surveyContainer: {
        padding: 16,

        backgroundColor: '#FFF', // Replace with your background color
        shadowColor: "#000", // This is the color of the shadow
        shadowOffset: {
            width: 0, // These are the X and Y offsets of the shadow
            height: 2, // A positive Y offset will put the shadow below the box
        },
        shadowOpacity: 0.25, // This defines how transparent the shadow is
        shadowRadius: 3.84, // This defines the blur radius of the shadow
        elevation: 5, // This is for Android shadow effect
        borderRadius: 5, // This will round the corners of your container
        marginBottom: 10, // Replace with your desired margin bottom
    },

    surveyOuterContainer:{
        padding:20,
    },

    questionText: {
        fontSize: 18, // Replace with your desired font size
        fontWeight: 'bold', // Replace with your desired font weight
        marginBottom: 20, // Replace with your desired margin bottom
    },
    optionContainer: {
        borderWidth: 1,
        borderColor: '#000', // Replace with your border color
        paddingVertical: 15, // Replace with your desired padding vertical
        paddingHorizontal: 10, // Replace with your desired padding horizontal
        borderRadius: 5, // Replace with your desired border radius
        marginBottom: 10, // Replace with your desired margin bottom
        backgroundColor: '#FFF', // Replace with your option background color
    },
    parallelogram: {
        minWidth: 300,
        maxWidth: 387,
        height: 40,
        backgroundColor: '#1a2f5a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20, // Adjust as needed.
        paddingRight: 20, // Adjust as needed.
        transform: [{ skewX: '-10deg' }], // Skew the parallelogram.
    },
    selectedOption: {
        backgroundColor: '#E0E0E0', // Replace with your selected option background color
    },
    optionText: {
        fontSize: 16, // Replace with your desired font size
        textAlign: 'center', // Replace with your desired text alignment
    },
});

export default Survey;


