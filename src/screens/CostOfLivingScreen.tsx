import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import {
  fetchCities,
  fetchPricesByCityCountry,
} from "../utils/costOfLivingData";
import { translateItemName } from "../utils/translateItemName";

// 화면 크기 가져오기
const { width, height } = Dimensions.get("window");

const CostOfLivingScreen = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [citySuggestions, setCitySuggestions] = useState<any[]>([]);
  const [countrySuggestions, setCountrySuggestions] = useState<any[]>([]);
  const [allCities, setAllCities] = useState<any[]>([]);
  const [allCountries, setAllCountries] = useState<any[]>([]);

  useEffect(() => {
    const getAllCitiesAndCountries = async () => {
      const citiesData = await fetchCities();
      setAllCities(citiesData);

      const countriesData = citiesData.map(
        (city: { city_name: string; country_name: string }) => city.country_name
      );
      setAllCountries(Array.from(new Set(countriesData))); // 중복 제거
    };

    getAllCitiesAndCountries();
  }, []);

  const handleCityChange = (text: string) => {
    setCity(text);
    if (text.length > 0) {
      const suggestions = allCities
        .filter((item) =>
          item.city_name.toLowerCase().includes(text.toLowerCase())
        )
        .slice(0, 10);
      setCitySuggestions(suggestions);
    } else {
      setCitySuggestions([]);
    }
  };

  const handleCountryChange = (text: string) => {
    setCountry(text);
    if (text.length > 0) {
      const suggestions = allCountries
        .filter((country) => country.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 10);
      setCountrySuggestions(suggestions);
    } else {
      setCountrySuggestions([]);
    }
  };

  const handleSelectCity = (selectedCity: any) => {
    setCity(selectedCity.city_name);
    setCountry(selectedCity.country_name);
    setCitySuggestions([]);
    setCountrySuggestions([]);
    Keyboard.dismiss();
  };

  const handleSelectCountry = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setCountrySuggestions([]);
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

      {/* 도시 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="도시 입력"
          value={city}
          onChangeText={handleCityChange}
        />

        {citySuggestions.length > 0 && (
          <ScrollView
            style={[
              styles.suggestionContainer,
              {
                top: height * 0.055,
                left: width * -0.0001,
                width: width * 0.9,
              },
            ]}
            contentContainerStyle={{ paddingVertical: 10 }}
          >
            {citySuggestions.map((item, index) => (
              <Text
                key={index}
                style={styles.suggestion}
                onPress={() => handleSelectCity(item)}
              >
                {item.city_name}, {item.country_name}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>

      {/* 나라 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="나라 입력"
          value={country}
          onChangeText={handleCountryChange}
        />

        {countrySuggestions.length > 0 && (
          <ScrollView
            style={[
              styles.suggestionContainer,
              {
                top: height * 0.055,
                left: width * -0.0001,
                width: width * 0.9,
              },
            ]}
            contentContainerStyle={{ paddingVertical: 10 }}
          >
            {countrySuggestions.map((item, index) => (
              <Text
                key={index}
                style={styles.suggestion}
                onPress={() => handleSelectCountry(item)}
              >
                {item}
              </Text>
            ))}
          </ScrollView>
        )}
      </View>

      <Button title="물가 정보 검색" onPress={handleSearch} />

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
  },
  inputContainer: {
    position: "relative",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
  },
  suggestionContainer: {
    position: "absolute",
    left: width * 0.05, // 화면 크기에 따라 비율로 설정
    right: width * 0.05, // 화면 크기에 따라 비율로 설정
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    zIndex: 10,
    borderRadius: 5,
    width: "90%", // 화면 크기에 따라 너비 조정
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
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
