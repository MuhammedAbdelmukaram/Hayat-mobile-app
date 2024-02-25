import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import React from "react";;
import {Provider} from "react-redux";
import store from './redux/store';
import Article from "./screens/Article";
import VideoArticle from "./screens/VideoArticle";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Survey from "./screens/Survey";
import TermsOfService from "./screens/TermsOfService";
import Account from "./screens/account";
import HayatPlay from "./screens/HayatPlay";
import VODcategories from "./screens/VODcategories";
import SubCategory from "./screens/SubCategory";
import TVShow from "./screens/TVShow";
import SubTvShow from "./screens/SubTvShow";
import LiveTv from "./screens/LiveTV";
import Uskoro from "./screens/uskoro";

export default function App() {

    const Stack = createStackNavigator();

  return (
      <Provider store={store}>
          <NavigationContainer>

            <Stack.Navigator initialRouteName="HomeScreen"
                             screenOptions={{
                               ...TransitionPresets.SlideFromRightIOS, // Use the sliding animation
                             }}
                             >

              <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ headerShown: false }}
              />

                <Stack.Screen
                    name="Article"
                    component={Article}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="VideoArticle"
                    component={VideoArticle}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="HayatPlay"
                    component={HayatPlay}
                    options={{ headerShown: false }}
                />

              <Stack.Screen
                  name="Uskoro"
                  component={Uskoro}
                  options={{ headerShown: false }}
              />

                <Stack.Screen
                    name="SubCategory"
                    component={SubCategory}
                    options={{ headerShown: false }}
                />

              <Stack.Screen
                  name="TvShow"
                  component={TVShow}
                  options={{ headerShown: false }}
              />

              <Stack.Screen
                  name="SubTvShow"
                  component={SubTvShow}
                  options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="LiveTV"
                  component={LiveTv}
                  options={{ headerShown: false }}
              />
              <Stack.Screen
                  name="VODcategories"
                  component={VODcategories}
                  options={{ headerShown: false }}
              />
                <Stack.Screen
                    name="Account"
                    component={Account}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false ,animationEnabled:false }}
                />

                <Stack.Screen
                    name="Survey"
                    component={Survey}
                    options={{ headerShown: false ,animationEnabled:false }}
                />

                <Stack.Screen
                    name="TermsOfService"
                    component={TermsOfService}
                    options={{ headerShown: false ,}}
                />

                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false ,animationEnabled:false }}
                />

            </Stack.Navigator>





          </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
