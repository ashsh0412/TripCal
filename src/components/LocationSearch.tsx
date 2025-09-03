import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
} from "react-native";
import { fetchCities } from "../utils/costOfLivingData";

const { width, height } = Dimensions.get("window");

interface LocationSearchProps {
  onCitySelect: (city: string, country: string) => void;
  initialCity?: string;
  initialCountry?: string;
}

const LocationSearch = ({
  onCitySelect,
  initialCity = "",
  initialCountry = "",
}: LocationSearchProps) => {
  const [city, setCity] = useState<string>(initialCity);
  const [country, setCountry] = useState<string>(initialCountry);
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

  // City input handling
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

  // Country input handling
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

  // City selection handling
  const handleSelectCity = (selectedCity: any) => {
    setCity(selectedCity.city_name);
    setCountry(selectedCity.country_name);
    setCitySuggestions([]);
    setCountrySuggestions([]);
    onCitySelect(selectedCity.city_name, selectedCity.country_name);
    Keyboard.dismiss();
  };

  // Country selection handling
  const handleSelectCountry = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setCountrySuggestions([]);
    onCitySelect(city, selectedCountry);
  };

  return (
    <View>
      {/* 도시 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="도시 입력 (영어로 입력해 주세요 Ex: Seoul)"
          value={city}
          onChangeText={handleCityChange}
        />

        {citySuggestions.length > 0 && (
          <ScrollView
            style={[
              styles.suggestionContainer,
              {
                top: height * 0.055,
                width: "100%",
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
          placeholder="나라 입력 (영어로 입력해 주세요 Ex: South Korea)"
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
                width: "100%",
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
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    marginBottom: 10,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  suggestionContainer: {
    position: "absolute",
    maxHeight: 150,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    zIndex: 10,
    borderRadius: 5,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

export default LocationSearch;
