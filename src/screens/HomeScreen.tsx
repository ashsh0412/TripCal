import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";

// useNavigation의 타입을 명확하게 지정
type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>환율 & 물가 비교 앱</Text>
      <CustomButton
        title="환율 비교하기"
        onPress={() => navigation.navigate("ExchangeRate")}
      />
      <CustomButton
        title="물가 비교하기"
        onPress={() => navigation.navigate("CostOfLiving")}
      />
      <CustomButton
        title="예산 계산기"
        onPress={() => navigation.navigate("BudgetPlanner")}
      />
      <CustomButton
        title="설정"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default HomeScreen;
