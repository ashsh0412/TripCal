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
          headerStyle: {
            backgroundColor: "#F5F8FF", // 배경색
            elevation: 0, // 안드로이드 그림자 제거
            shadowOpacity: 0, // iOS 그림자 제거
          },
          headerTitleAlign: "center", // 타이틀 가운데 정렬
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
            color: "#333", // 타이틀 글자 색상
          },
          headerTintColor: "#4481EB", // 뒤로가기 아이콘 색상
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "홈" }}
        />
        <Stack.Screen
          name="ExchangeRate"
          component={ExchangeRateScreen}
          options={{ title: "환율 비교" }}
        />
        <Stack.Screen
          name="CostOfLiving"
          component={CostOfLivingScreen}
          options={{ title: "물가 비교" }}
        />
        <Stack.Screen
          name="BudgetPlanner"
          component={BudgetPlannerScreen}
          options={{ title: "예산 계산기" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "설정" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
