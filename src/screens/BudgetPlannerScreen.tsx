import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BudgetPlannerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>여행 예산 계산기</Text>
      <Text>여기에 예산 계산 기능을 추가할 예정!</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default BudgetPlannerScreen;
