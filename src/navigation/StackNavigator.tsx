import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import CostOfLivingScreen from "../screens/CostOfLivingScreen";
import BudgetPlannerScreen from "../screens/BudgetPlannerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { RootStackParamList, MainTabParamList } from "./types";
import { Ionicons } from "@expo/vector-icons";
import CountryInfoScreen from "../screens/CountryInfoScreen";

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        animation: "fade",
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "CountryInfo") iconName = "earth-outline";
          else if (route.name === "CostOfLiving")
            iconName = "stats-chart-outline";
          else if (route.name === "BudgetPlanner") iconName = "wallet-outline";
          else if (route.name === "Settings") iconName = "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="CountryInfo" component={CountryInfoScreen} />
      <Tab.Screen name="CostOfLiving" component={CostOfLivingScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="BudgetPlanner" component={BudgetPlannerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
