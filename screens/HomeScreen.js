// components/HomeScreen.js
import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    PanResponder,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Header from "../components/Common/Header";
import NavList from "../components/Common/NavList";
import HighlightNews from "../components/HomeScreen/HighlightNews";
import CategoryContent from "../components/CategoryContent";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setHighlightData, setMainArticles, setSelectedCategory} from "../redux/slices/selectedContentSlice";
import CategoryHighlightNews from "../components/CategoryHighlightNews";
import Najnovije from "./Najnovije";
import {API_URL} from '@env';
import LoadingScreen from "./LoadingScreen";

const theme = {
    ...DefaultTheme,
    fonts: {
        main: 'Assistant',
    },
};

const HomeScreen = () => {
    const selectedCategory = useSelector((state) => state.selectedContent.selectedCategory);
    const highlightData = useSelector((state) => state.selectedContent.highlightData);
    const dispatch = useDispatch();
    const [dataLoaded, setDataLoaded] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);

    const [isLoading, setIsLoading] = useState(false);

    // Function to update loading state
    const handleLoading = (loading) => {
        setIsLoading(loading);
    };

    // Your existing useEffect hooks and logic...

    if (isLoading) {
        return <LoadingScreen />; // Display the loading screen if any part of the app is loading
    }


    console.log(userInfo);
    useEffect(() => {
        const fetchData = async () => {
            setDataLoaded(false); // Reset the dataLoaded state before fetching new data

            try {
                // Fetching highlight data
                const highlightResponse = await axios.get(`${API_URL}/articles/highlight`);
                dispatch(setHighlightData(highlightResponse.data));

                // Fetching main articles data (moved from CategoryHighlightNews)
                const mainArticlesResponse = await axios.get(`${API_URL}/articles/main`);
                console.log('Fetched main articles data:', mainArticlesResponse.data);
                dispatch(setMainArticles(mainArticlesResponse.data)); // Dispatch the action for main articles

                setDataLoaded(true); // Indicate that data has been loaded
            } catch (error) {
                console.error('Error fetching data:', error);
                setDataLoaded(true); // Ensure the dataLoaded state is set even in case of an error
            }
        };

        fetchData();
    }, [dispatch]);




    useEffect(() => {
        if (userInfo && !userInfo.confirmed) {
            // User is logged in but not confirmed, show an alert
            console.log(userInfo.confirmed);
            Alert.alert(
                "Verify Your Account",
                "You need to verify your account. Check your email."
            );
        }
    }, [userInfo]);

    const renderContent = () => {
        if (!dataLoaded) {
            // Render loading state or indicator
            return <ActivityIndicator />;
        }

        else if (selectedCategory === "pocetna") {
            // Render HighlightNews component
            return <>
                <HighlightNews />
                <CategoryHighlightNews />
                {/* Additional components related to HighlightNews and CategoryHighlightNews */}
            </>
            ;
        }

        else if (selectedCategory === "najnovije") {
            // Render Najnovije component
            console.log('Selected Category:', selectedCategory);
            return <Najnovije />;
        }


        else if (selectedCategory !== "pocetna") {
            // Render CategoryContent component with appropriate props
            console.log('Selected Category:', selectedCategory);
            return <CategoryContent />;
        }

        else {
            // Render the default component (HighlightNews)
            return <HighlightNews />;
        }
    };


    const categoriesData = useSelector((state) => state.selectedContent.categoriesData); // Assuming this holds the full categories array


    useEffect(() => {
        console.log('Selected Category:', selectedCategory); // Log the selected category

        // ... rest of useEffect
    }, [selectedCategory]);


    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 30 : StatusBar.currentHeight;
    const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;






    return (
        <ScrollView bounces={false} overScrollMode="never">
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#1A2F5A" }}>
                <StatusBar translucent backgroundColor="#1A2F5A" barStyle="light-content" />
            </View>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <Header />
                    <NavList />
                    <View>
                        {renderContent()}
                    </View>
                </>
            )}
        </ScrollView>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A2F5A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBar: {
        color: "#fff"
    },
});

export default HomeScreen;
