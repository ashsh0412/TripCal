import React from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useExchangeRate } from "../hooks/useExchangeRate";

const ExchangeRateScreen = () => {
  const { rates, loading, error } = useExchangeRate("USD");

  if (loading) return <ActivityIndicator size="large" color="blue" />;
  if (error) return <Text>{error}</Text>;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        USD 기준 환율
      </Text>
      {rates &&
        Object.keys(rates).map((currency) => (
          <Text key={currency}>
            {currency}: {rates[currency].toFixed(2)}
          </Text>
        ))}
    </ScrollView>
  );
};

export default ExchangeRateScreen;
