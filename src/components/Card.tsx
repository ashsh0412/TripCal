// src/components/Card.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getCurrencyData } from "../utils/currencyData";

interface CardProps {
  currencyCode: string;
  exchangeRate: number;
}

const Card: React.FC<CardProps> = ({ currencyCode, exchangeRate }) => {
  const [currencyInfo, setCurrencyInfo] = useState<{
    countryName: string;
    flag: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrencyData();
      setCurrencyInfo(data[currencyCode] || null);
    };

    fetchData();
  }, [currencyCode]);

  return (
    <View style={styles.card}>
      {currencyInfo && (
        <View style={styles.row}>
          {currencyInfo.flag ? (
            <Image source={{ uri: currencyInfo.flag }} style={styles.flag} />
          ) : (
            <Text style={styles.flagPlaceholder}>🏳️</Text>
          )}
          <Text style={styles.currencyName}>
            {currencyInfo.countryName} ({currencyCode})
          </Text>
        </View>
      )}
      <Text style={styles.exchangeRate}>
        1 {currencyCode} = {exchangeRate.toFixed(2)} KRW
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 8,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  flag: {
    width: 32,
    height: 24,
    marginRight: 10,
  },
  flagPlaceholder: {
    fontSize: 28,
    marginRight: 10,
  },
  currencyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  exchangeRate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
});

export default Card;
