import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert, StatusBar, Platform} from "react-native";
import {useSelector} from "react-redux";
import HeaderAccount from "../components/Account/headerAccount";

const Account = () => {

    const userInfo = useSelector((state) => state.user.userInfo);

    console.log(userInfo);
    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 40 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
    return (
        <View>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#1A2F5A" }}>
                <StatusBar
                    translucent
                    backgroundColor="#1A2F5A"
                    barStyle="light-content"
                />
            </View>
            <HeaderAccount/>

            {userInfo && (
                <View style={styles.userInfoContainer}>

                    {/*<TouchableOpacity style={styles.button}>
                        <Image
                            source={require('../assets/userName.png')}
                            style={styles.backIcon}
                            resizeMode={"contain"}
                        />
                        <View style={styles.texts}>
                            <Text style={styles.userInfoText}>Ime</Text>
                            <Text style={styles.userInfo}>Hasan</Text>
                        </View>
                    </TouchableOpacity>*/}

                    <TouchableOpacity style={styles.button}>
                        <Image
                            source={require('../assets/email.png')}
                            style={styles.backIcon}
                            resizeMode={"contain"}
                        />
                        <View style={styles.texts}>
                            <Text style={styles.userInfoText}>Email:</Text>
                            <Text style={styles.userInfo}>{userInfo.email}</Text>
                        </View>
                    </TouchableOpacity>

                    {!userInfo.confirmed ? (
                        <TouchableOpacity style={styles.button}>
                            <Image
                                source={require('../assets/verified.png')}
                                style={styles.backIcon}
                                resizeMode={"contain"}
                            />
                            <View style={styles.texts}>
                                <Text style={styles.userInfoText}>Verifikovan</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => Alert.alert(
                                "Potrebna Verifikacija",
                                "Molimo vas da pratite upute poslane na vašu email adresu kako biste verifikovali vaš račun. Ako niste primili email, provjerite vaš spam folder ili zatražite novi email za verifikaciju.",
                                [
                                    { text: "OK" }
                                ],
                                { cancelable: true }
                            )}
                        >
                            <Image
                                source={require('../assets/exclamation.png')}
                                style={styles.backIcon}
                                resizeMode={"contain"}
                            />
                            <View style={styles.texts}>
                                <Text style={styles.userInfoText}>Potrebna Verifikacija</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    userInfoContainer:{
    },
    userInfoText:{
        fontWeight:"bold"
    },
    userInfo:{

    },
    button:{
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:"#ffffff",
        paddingVertical:14,
        paddingHorizontal:20,
        borderWidth:1,
        borderColor:"#eaeaea"
    },
    texts:{
        marginLeft:20
    },
    backIcon:{
        width: 36,
        height: 36
    }
})

export default Account;
