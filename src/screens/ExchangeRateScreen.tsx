import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
import { useExchangeRate } from "../hooks/useExchangeRate";
import Card from "../components/Card";
import CurrencySelector from "../components/CurrencySelector";

const ITEMS_PER_PAGE = 10;

const ExchangeRateScreen = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const { rates, loading, error } = useExchangeRate(baseCurrency);
  const [currentPage, setCurrentPage] = useState(0);

  const rateKeys = rates ? Object.keys(rates) : [];
  const totalPages = Math.ceil(rateKeys.length / ITEMS_PER_PAGE);
  const paginatedRates = rateKeys.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>환율 비교</Text>

        {/* 기준 통화 선택 - 위치 조정 */}
        <View style={styles.selectorContainer}>
          <CurrencySelector
            selectedCurrency={baseCurrency}
            onChange={(currency) => {
              setBaseCurrency(currency);
              setCurrentPage(0);
            }}
          />
        </View>
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
            title={currency}
            value={rates ? rates[currency].toFixed(2) : "N/A"}
          />
        ))}
      </ScrollView>

      {/* 페이지네이션 컨트롤 */}
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
  selectorContainer: {
    marginBottom: 16,
    width: "100%",
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
