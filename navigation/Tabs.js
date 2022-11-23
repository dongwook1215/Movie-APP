import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import { useColorScheme } from 'react-native';
import Movies from "../screens/Movies";
import Tv from "../../MOVIEAPP/screens/Tv";
import Search from "../../MOVIEAPP/screens/Search";
import { BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR } from "../colors";
import { Ionicons } from '@expo/vector-icons';
import Stack from "./Stack"

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === "dark";
    return (<Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: isDark ? BLACK_COLOR : "white"
        }}
        screenOptions={
            {
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "white",
                },
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
                tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "white",
                },
                headerTitleStyle: {
                    color: isDark ? "white" : BLACK_COLOR,
                },
                tabBarLabelStyle: {
                    fontSize : 12,
                    fontWeight: "600",
                    marginTop: -5
                }
            }
        }>
        <Tab.Screen name="Movies"  component={Movies} options={{
            tabBarIcon: ({focused, color, size}) => {
                return <Ionicons name={focused ? "film":"film-outline"} color={color} size={size} />
            }
        }}/>
        <Tab.Screen name="TV"  component={Tv} options={{
            tabBarIcon: ({focused, color, size}) => {
                return <Ionicons name={focused ? "tv" : "tv-outline"} color={color} size={size} />
            }
        }}/>
        <Tab.Screen name="Search"  component={Search} options={{
            tabBarIcon: ({focused, color, size}) => {
                return <Ionicons name={focused ? "search":"search-outline"} color={color} size={size} />
            }
        }}/>
    </Tab.Navigator>)
}

export default Tabs;
