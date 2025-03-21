import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const BudgetPlannerScreen = () => {
  // 상태 변수 설정
  const [totalBudget, setTotalBudget] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [food, setFood] = useState("");
  const [transportation, setTransportation] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState<number | null>(null);

  // 예산 계산 함수
  const calculateBudget = () => {
    const total =
      parseFloat(accommodation) + parseFloat(food) + parseFloat(transportation);
    setTotalExpense(total);

    // 예산과 비교하여 잉여 금액 또는 초과 금액 계산
    const remainingBalance = parseFloat(totalBudget) - total;
    setBalance(remainingBalance);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>여행 예산 계산기</Text>

      {/* 예산 입력 */}
      <TextInput
        style={styles.input}
        placeholder="전체 예산을 입력하세요"
        keyboardType="numeric"
        value={totalBudget}
        onChangeText={setTotalBudget}
      />

      {/* 각 항목별 예산 입력 */}
      <TextInput
        style={styles.input}
        placeholder="숙박비"
        keyboardType="numeric"
        value={accommodation}
        onChangeText={setAccommodation}
      />
      <TextInput
        style={styles.input}
        placeholder="식비"
        keyboardType="numeric"
        value={food}
        onChangeText={setFood}
      />
      <TextInput
        style={styles.input}
        placeholder="교통비"
        keyboardType="numeric"
        value={transportation}
        onChangeText={setTransportation}
      />

      {/* 예산 계산 버튼 */}
      <Button title="예산 계산" onPress={calculateBudget} />

      {/* 결과 출력 */}
      <Text style={styles.result}>총 지출: {totalExpense} 원</Text>
      {balance !== null && (
        <Text style={styles.result}>
          {balance >= 0
            ? `남은 예산: ${balance} 원`
            : `예산 초과: ${Math.abs(balance)} 원`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default BudgetPlannerScreen;
