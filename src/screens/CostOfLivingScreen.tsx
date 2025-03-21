import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CostOfLivingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>물가 비교</Text>
      <Text>여기에 물가 데이터를 표시할 예정!</Text>
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

export default CostOfLivingScreen;
