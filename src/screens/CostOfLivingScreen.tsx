import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import { fetchPricesByCityCountry } from "../utils/costOfLivingData";
import { translateItemName } from "../utils/translateItemName";
import LocationSearch from "../components/LocationSearch";

// 화면 크기 가져오기
const { width, height } = Dimensions.get("window");

const CostOfLivingScreen = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCityCountrySelect = (
    selectedCity: string,
    selectedCountry: string
  ) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
  };

  const handleSearch = async () => {
    if (!city || !country) {
      setError("도시와 나라를 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");
    setPrices([]);

    try {
      const data = await fetchPricesByCityCountry(city, country);
      setPrices(data);
    } catch (err) {
      setError("물가 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>물가 정보 검색</Text>

      <LocationSearch onCitySelect={handleCityCountrySelect} />

      <Button title="물가 정보 검색 🔎" onPress={handleSearch} />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Text style={styles.noDataText}>데이터를 불러오는 중...</Text>
        ) : prices.length > 0 ? (
          prices.map((item, index) => (
            <View key={index} style={styles.priceItem}>
              <Text style={styles.priceTitle}>
                {translateItemName(item.item_name)}
              </Text>
              <Text>{`평균 가격: ${Number(item.avg).toLocaleString()} ${
                item.currency_code
              }`}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>검색된 물가 정보가 없습니다.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 35,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  priceItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  priceTitle: {
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#777",
  },
});

export default CostOfLivingScreen;
