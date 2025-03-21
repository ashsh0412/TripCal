// src/screens/ExchangeRateScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useExchangeRate } from "../hooks/useExchangeRate";
import Card from "../components/Card";
import { getCurrencyData } from "../utils/currencyData";

const ITEMS_PER_PAGE = 10;

const ExchangeRateScreen = () => {
  const baseCurrency = "KRW"; // 기준 통화 고정
  const { rates, loading, error } = useExchangeRate(baseCurrency);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currencyInfoMap, setCurrencyInfoMap] = useState<{
    [key: string]: { countryName: string };
  }>({});

  useEffect(() => {
    const fetchCurrencyInfo = async () => {
      const data = await getCurrencyData();
      setCurrencyInfoMap(data);
    };
    fetchCurrencyInfo();
  }, []);

  const rateKeys = rates ? Object.keys(rates) : [];
  const totalPages = Math.ceil(rateKeys.length / ITEMS_PER_PAGE);

  const filteredRates = rateKeys.filter((currency) => {
    const lowerQuery = searchQuery.toLowerCase();
    const currencyName =
      currencyInfoMap[currency]?.countryName.toLowerCase() || "";
    return (
      currency.toLowerCase().includes(lowerQuery) ||
      currencyName.includes(lowerQuery)
    );
  });

  const paginatedRates = searchQuery
    ? filteredRates
    : filteredRates.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="통화 코드 또는 국가 이름 검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
      >
        {paginatedRates.map((currency) => (
          <Card
            key={currency}
            currencyCode={currency}
            exchangeRate={rates ? 1 / rates[currency] : 0}
          />
        ))}
      </ScrollView>

      {!searchQuery && (
        <View style={styles.pagination}>
          <Button
            title="이전"
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          />
          <Text style={styles.pageInfo}>{`${
            currentPage + 1
          } / ${totalPages}`}</Text>
          <Button
            title="다음"
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage >= totalPages - 1}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#007AFF",
    textAlign: "center",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  pageInfo: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default ExchangeRateScreen;
