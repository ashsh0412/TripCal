import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ExchangeRateScreen from "../screens/ExchangeRateScreen";
import CostOfLivingScreen from "../screens/CostOfLivingScreen";
import BudgetPlannerScreen from "../screens/BudgetPlannerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // 헤더 숨기기
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ExchangeRate" component={ExchangeRateScreen} />
        <Stack.Screen name="CostOfLiving" component={CostOfLivingScreen} />
        <Stack.Screen name="BudgetPlanner" component={BudgetPlannerScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
