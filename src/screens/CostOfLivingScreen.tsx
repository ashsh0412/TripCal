import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { fetchPricesByCityCountry } from "../utils/costOfLivingData";

const CostOfLivingScreen = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 항목명 한국어로 번역하는 함수
  const translateItemName = (itemName: string) => {
    const translations: { [key: string]: string } = {
      "Pair of Jeans in a Chain Store Like George, H&M, Zara, etc.":
        "H&M, Zara와 같은 체인점 청바지",
      "Pair of Leather Business Shoes": "가죽 비즈니스 신발 한 켤레",
      "Pair of Running Shoes, Mid-Range Price": "중급 운동화 한 켤레",
      "Apples, 1 kg": "사과 1kg",
      "Banana, 1 kg": "바나나 1kg",
      "Beef Round or Equivalent Back Leg Red Meat, 1 kg ": "쇠고기 1kg",
      "Bottle of Wine, Mid-Range Price": "중급 와인 한 병",
      "Chicken Breasts, Boneless and Skinless, 1 kg": "뼈 없는 닭 가슴살 1kg",
      "Domestic Beer, 0.5 liter Bottle": "국내 맥주 0.5리터 병",
      "Eggs, 12 pack": "달걀 12개 한 팩",
      "Lettuce, 1 head": "상추 1개",
      "Loaf of Fresh White Bread, 0.5 kg": "신선한 흰빵 0.5kg",
      "Local Cheese, 1 kg": "현지 치즈 1kg",
      "Milk, Regular,1 liter": "일반 우유 1리터",
      "Onion, 1 kg": "양파 1kg",
      "Oranges, 1 kg": "오렌지 1kg",
      "Pack of Cigarettes": "담배 한 갑",
      "Potato, 1 kg": "감자 1kg",
      "White Rice, 1 kg": "흰쌀 1kg",
      "Tomato, 1 kg": "토마토 1kg",
      "Water, 1.5 liter Bottle": "생수 1.5리터 병",
      Cappuccino: "카푸치노 한 잔",
      "Coca-Cola, 0.33 liter Bottle": "코카콜라 0.33리터 병",
      "Domestic Beer, 0.5 liter Draught": "국내 생맥주 0.5리터",
      "Imported Beer, 0.33 liter Bottle": "수입 맥주 0.33리터 병",
      "McMeal at McDonalds or Alternative Combo Meal":
        "맥도날드 세트 메뉴 또는 동급 콤보세트",
      "Meal for 2 People, Mid-range Restaurant, Three-course":
        "중급 식당 2인용 세 끼 코스 식사",
      "Meal in Inexpensive Restaurant": "저렴한 식당의 한 끼 식사",
      "Cinema ticket, 1 Seat": "영화관 표 1장",
      "Fitness Club, Monthly Fee for 1 Adult": "성인 피트니스 클럽 월간 이용료",
      "Tennis Court Rent, 1 Hour on Weekend": "테니스장 주말 1시간 대여료",
      "Gasoline, 1 liter": "휘발유 1리터",
      "Monthly Pass, Regular Price": "대중교통 월 정기권 요금",
      "One-way Ticket, Local Transport": "편도 대중교통 티켓",
      "Taxi, price for 1 hour Waiting, Normal Tariff": "택시 1시간 대기요금",
      "Taxi, price for 1 km, Normal Tariff": "택시 1km 요금",
      "Taxi Start, Normal Tariff": "택시 기본요금",
      "Volkswagen Golf 1.4 90 KW Trendline (Or Equivalent New Car)":
        "폭스바겐 골프 1.4 (또는 동급 차량)",
      "Prepaid Mobile Tariff Local, price per 1 min, No Discounts or Plans":
        "선불 휴대전화 1분 통화요금 (할인/플랜 없음)",
      "Basic utilities for 85 square meter Apartment including Electricity, Heating or Cooling, Water and Garbage":
        "85㎡ 아파트 공과금(전기, 난방/냉방, 수도, 쓰레기 포함)",
      "Internet, 60 Mbps or More, Unlimited Data, Cable/ADSL":
        "인터넷 (60Mbps 이상, 무제한 데이터, 케이블/ADSL)",
      "Water, 0.33 liter Bottle": "생수 0.33리터 병",
      "Summer Dress in a Chain Store Like George, H&M, Zara, etc.":
        "H&M, Zara와 같은 체인점의 여름 원피스",
      "Mortgage Interest Rate in Percentages for 20 Years Fixed-Rate, Yearly, Fixed-Rate":
        "20년 고정 모기지 연이율",
      "Price per square meter to Buy Apartment in City Center":
        "도심 지역 아파트 1㎡당 가격",
      "Price per square meter to Buy Apartment Outside of City Center":
        "도심 외곽 아파트 1㎡당 가격",
      "Average Monthly Net Salary, After Tax": "평균 월급 (세후)",
      "International Primary School, Yearly for 1 Child":
        "국제학교 1인당 연간 등록금",
      "Private Preschool or Kindergarten, Monthly for 1 Child":
        "사립 유치원 혹은 어린이집 월간 등록금",
      "One bedroom apartment in city centre": "도심 지역 원룸 아파트",
      "One bedroom apartment outside of city centre": "도심 외곽 원룸 아파트",
      "Three bedroom apartment in city centre": "도심 지역 3룸 아파트",
      "Three bedroom apartment outside of city centre": "도심 외곽 3룸 아파트",
    };

    return translations[itemName] || itemName;
  };

  // 선택된 도시와 국가로 물가 정보 가져오기
  const handleSearch = async () => {
    if (!city || !country) {
      setError("도시와 나라를 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchPricesByCityCountry(city, country);
      setPrices(data);
    } catch (err) {
      setError("물가 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 도시 입력 */}
      <TextInput
        style={styles.input}
        placeholder="도시 입력"
        value={city}
        onChangeText={setCity}
      />

      {/* 나라 입력 */}
      <TextInput
        style={styles.input}
        placeholder="나라 입력"
        value={country}
        onChangeText={setCountry}
      />

      {/* 검색 버튼 */}
      <Button title="물가 정보 검색" onPress={handleSearch} />

      {/* 오류 메시지 */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* 스크롤 가능한 물가 정보 표시 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <Text>데이터를 불러오는 중...</Text>
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
          <Text>검색된 물가 정보가 없습니다.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
    paddingBottom: 20, // 스크롤이 끝날 때 여백 추가
  },
});

export default CostOfLivingScreen;
