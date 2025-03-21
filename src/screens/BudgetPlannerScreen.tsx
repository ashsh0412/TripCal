import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchPricesByCityCountry } from "../utils/costOfLivingData";
import LocationSearch from "../components/LocationSearch";
import { Ionicons } from "@expo/vector-icons";

const BudgetPlannerScreen = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [style, setStyle] = useState("average");
  const [days, setDays] = useState("");
  const [people, setPeople] = useState("");
  const [prices, setPrices] = useState<any[]>([]);
  const [totalBudget, setTotalBudget] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [breakdown, setBreakdown] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "KRW">("USD");
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [shoppingTotal, setShoppingTotal] = useState(0);
  const [shoppingItems, setShoppingItems] = useState<string[]>([]);

  const handleCityCountrySelect = (
    selectedCity: string,
    selectedCountry: string
  ) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
    setPrices([]);
    setTotalBudget(null);
  };

  const handleFetch = async () => {
    if (!city || !country || !days || !people) {
      setError("모든 정보를 입력해주세요.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await fetchPricesByCityCountry(city, country);
      setPrices(data);
      setExchangeRates(data.exchange_rate || null);
    } catch (e) {
      setError("물가 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = (amount: number): number => {
    if (currency === "USD") return amount;
    if (currency === "KRW") {
      const rate = exchangeRates?.KRW ?? 1300;
      return amount * rate;
    }
    return amount;
  };

  useEffect(() => {
    if (prices.length > 0) {
      calculateBudget();
    }
  }, [prices, style]);

  const calculateBudget = () => {
    const getValue = (item: any) => {
      if (!item || !item.usd) return 0;
      return parseFloat(item.usd.avg);
    };

    const find = (name: string) =>
      prices.find((item) => item.item_name === name);

    const daysInt = parseInt(days);
    const peopleInt = parseInt(people);
    if (isNaN(daysInt) || isNaN(peopleInt) || daysInt <= 0 || peopleInt <= 0) {
      setBreakdown([]);
      setTotalBudget(null);
      return;
    }

    let mealUnit = 0,
      stayUnit = 0,
      transportUnit = 0,
      coffeeUnit = 0,
      beerUnit = 0;
    let items: string[] = [];

    if (style === "min") {
      mealUnit = getValue(find("Meal in Inexpensive Restaurant")) * 2;
      stayUnit = Math.round(
        (getValue(find("One bedroom apartment outside of city centre")) / 30) *
          1.5 // 1.5 평 기준 월세
      );
      transportUnit = getValue(find("One-way Ticket, Local Transport")) * 4;
      coffeeUnit = 0;
      beerUnit = 0;
      items = [];
    } else if (style === "average") {
      mealUnit =
        (getValue(
          find("Meal for 2 People, Mid-range Restaurant, Three-course")
        ) /
          2) *
        2;
      stayUnit = Math.round(
        (getValue(find("One bedroom apartment in city centre")) / 30) * 2.5 // 2.5 평 기준 월세
      );
      transportUnit = getValue(find("One-way Ticket, Local Transport")) * 6;
      coffeeUnit = getValue(find("Cappuccino")) * 1;
      beerUnit = getValue(find("Domestic Beer, 0.5 liter Draught")) * 1;
      items = ["Summer Dress in a Chain Store Like George, H&M, Zara, etc."];
    } else if (style === "max") {
      mealUnit =
        (getValue(
          find("Meal for 2 People, Mid-range Restaurant, Three-course")
        ) /
          2) *
        6;
      stayUnit = Math.round(
        (getValue(find("Three bedroom apartment in city centre")) / 30) * 3 // 2.5 평 기준 월세
      );
      transportUnit =
        getValue(find("Taxi, price for 1 km, Normal Tariff")) * 10 +
        getValue(find("Taxi Start, Normal Tariff"));
      coffeeUnit = getValue(find("Cappuccino")) * 2;
      beerUnit = getValue(find("Bottle of Wine, Mid-Range Price"));
      items = [
        "Pair of Leather Business Shoes",
        "Summer Dress in a Chain Store Like George, H&M, Zara, etc.",
      ];
    }

    setShoppingItems(items);

    const dailyDetails = Array.from({ length: daysInt }).map((_, index) => ({
      day: index + 1,
      meal: mealUnit,
      stay: stayUnit,
      transport: transportUnit,
      coffee: coffeeUnit,
      beer: beerUnit,
      total: mealUnit + stayUnit + transportUnit + coffeeUnit + beerUnit,
    }));

    const baseTotal =
      dailyDetails.reduce((sum, day) => sum + day.total, 0) * peopleInt;

    const shoppingCost =
      items.reduce((sum, itemName) => {
        return sum + getValue(find(itemName));
      }, 0) * peopleInt;

    setShoppingTotal(shoppingCost);
    setTotalBudget(Math.round(baseTotal + shoppingCost));
    setBreakdown(dailyDetails);
  };

  const renderStyleLabel = () => {
    if (style === "min") return "(저렴한 스타일)";
    if (style === "max") return "(럭셔리 스타일)";
    return "(일반 스타일)";
  };

  const getItemIcon = (itemType: string): keyof typeof Ionicons.glyphMap => {
    switch (itemType) {
      case "stay":
        return "bed-outline";
      case "meal":
        return "restaurant-outline";
      case "transport":
        return "bus-outline";
      case "coffee":
        return "cafe-outline";
      case "beer":
        return "beer-outline";
      case "shopping":
        return "shirt-outline";
      default:
        return "wallet-outline";
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>여행 예산 계산기</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>기본 정보</Text>

            <View style={{ width: "100%", marginBottom: 14 }}>
              <LocationSearch
                onCitySelect={handleCityCountrySelect}
                initialCity={city}
                initialCountry={country}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="여행 일수"
                keyboardType="numeric"
                value={days}
                onChangeText={setDays}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="people-outline"
                size={22}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="인원 수"
                keyboardType="numeric"
                value={people}
                onChangeText={setPeople}
              />
            </View>

            <Text style={styles.inputLabel}>여행 스타일</Text>
            <View style={styles.styleSelector}>
              {["min", "average", "max"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.styleButton,
                    style === option && styles.styleButtonSelected,
                  ]}
                  onPress={() => setStyle(option)}
                >
                  <Ionicons
                    name={
                      option === "min"
                        ? "wallet-outline"
                        : option === "max"
                        ? "diamond-outline"
                        : "card-outline"
                    }
                    size={18}
                    color={style === option ? "white" : "#007AFF"}
                  />
                  <Text
                    style={[
                      styles.styleButtonText,
                      style === option && styles.styleButtonTextSelected,
                    ]}
                  >
                    {option === "min"
                      ? "저렴"
                      : option === "average"
                      ? "일반"
                      : "럭셔리"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>표시 통화</Text>
            <View style={styles.styleSelector}>
              {["USD", "KRW"].map((cur) => (
                <TouchableOpacity
                  key={cur}
                  style={[
                    styles.styleButton,
                    currency === cur && styles.styleButtonSelected,
                  ]}
                  onPress={() => setCurrency(cur as "USD" | "KRW")}
                >
                  <Ionicons
                    name="cash-outline"
                    size={18}
                    color={currency === cur ? "white" : "#007AFF"}
                  />
                  <Text
                    style={[
                      styles.styleButtonText,
                      currency === cur && styles.styleButtonTextSelected,
                    ]}
                  >
                    {cur === "USD" ? "달러(USD)" : "원화(KRW)"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.calculateButton}
              onPress={handleFetch}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <Ionicons
                    name="calculator-outline"
                    size={20}
                    color="white"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.calculateButtonText}>예산 계산하기</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={20} color="white" />
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : null}

          {totalBudget !== null && breakdown.length > 0 && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>여행 예산 결과</Text>
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>총 예상 경비</Text>
                <Text style={styles.totalAmount}>
                  {currency === "KRW" ? "₩" : "$"}
                  {convertCurrency(totalBudget).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </Text>
                <Text style={styles.styleLabel}>{renderStyleLabel()}</Text>
                <Text style={styles.noticeText}>
                  ※ 본 계산은 참고용이며 실제 비용은 달라질 수 있습니다.
                </Text>
              </View>

              <View style={styles.divider} />
              <Text style={styles.breakdownTitle}>상세 내역</Text>
              {["stay", "meal", "transport", "coffee", "beer", "shopping"].map(
                (item) => {
                  const firstDay = breakdown[0];
                  if (!firstDay) return null;

                  let amount = 0;
                  let koreanName = "";
                  let iconName = getItemIcon(item);

                  if (item === "shopping") {
                    koreanName = "쇼핑";
                    amount = shoppingTotal;
                  } else {
                    koreanName =
                      {
                        stay: "숙박",
                        meal: "식비 (하루 2끼 기준)",
                        transport: "교통",
                        coffee: "카페",
                        beer: "주류",
                      }[item] || item;

                    amount =
                      firstDay[item] * breakdown.length * parseInt(people);
                  }

                  const amountDisplay =
                    currency === "USD"
                      ? `$${amount.toFixed(2)}`
                      : `${(
                          amount * (exchangeRates?.KRW ?? 1300)
                        ).toLocaleString()} KRW`;

                  const percentage = ((amount / totalBudget) * 100).toFixed(1);

                  return (
                    <View key={item} style={styles.breakdownRow}>
                      <View style={styles.breakdownLeft}>
                        <View style={styles.iconContainer}>
                          <Ionicons
                            name={iconName as keyof typeof Ionicons.glyphMap}
                            size={18}
                            color="#007AFF"
                          />
                        </View>
                        <Text style={styles.breakdownLabel}>{koreanName}</Text>
                      </View>
                      <View style={styles.breakdownRight}>
                        <Text style={styles.breakdownAmount}>
                          {amountDisplay}
                        </Text>
                        <Text style={styles.breakdownPercentage}>
                          {percentage}%
                        </Text>
                      </View>
                    </View>
                  );
                }
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputLabel: {
    alignSelf: "flex-start",
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 15,
    color: "#444",
  },
  styleSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  styleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "white",
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
  },
  styleButtonSelected: {
    backgroundColor: "#007AFF",
  },
  styleButtonText: {
    color: "#007AFF",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 14,
  },
  styleButtonTextSelected: {
    color: "white",
  },
  calculateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
  },
  calculateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff3b30",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  error: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  totalContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007AFF",
  },
  styleLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 16,
    width: "100%",
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  breakdownLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  breakdownLabel: {
    fontSize: 15,
    color: "#444",
  },
  breakdownRight: {
    alignItems: "flex-end",
  },
  breakdownAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  breakdownPercentage: {
    fontSize: 12,
    color: "#888",
  },
  breakdownTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  breakdownTotalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  noticeText: {
    fontSize: 12,
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default BudgetPlannerScreen;
