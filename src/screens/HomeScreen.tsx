import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";
import TipCard from "../components/TipCard";
import DestinationCard from "../components/DestinationCard";
import {
  fetchEmbassyData,
  fetchOverviewData,
  fetchEnvironmentalData,
} from "../utils/destinationCard_api";
import CountryInfoModal from "../components/CountryInfoModal";

// 타입 명시
type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const countryToISO: { [key: string]: string } = {
  일본: "JP",
  태국: "TH",
  프랑스: "FR",
  미국: "US",
  호주: "AU",
  이탈리아: "IT",
  영국: "GB",
  베트남: "VN",
  독일: "DE",
  브라질: "BR",
};

const recommendedDestinations = [
  { city: "도쿄", country: "일본", flag: "🇯🇵" },
  { city: "방콕", country: "태국", flag: "🇹🇭" },
  { city: "파리", country: "프랑스", flag: "🇫🇷" },
  { city: "뉴욕", country: "미국", flag: "🇺🇸" },
  { city: "시드니", country: "호주", flag: "🇦🇺" },
  { city: "로마", country: "이탈리아", flag: "🇮🇹" },
  { city: "런던", country: "영국", flag: "🇬🇧" },
  { city: "하노이", country: "베트남", flag: "🇻🇳" },
  { city: "베를린", country: "독일", flag: "🇩🇪" },
  { city: "리우", country: "브라질", flag: "🇧🇷" },
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  const handleCardPress = async (country: string) => {
    try {
      const iso = countryToISO[country];
      if (!iso) return;

      const [embassyList, overview, environment] = await Promise.all([
        fetchEmbassyData(country),
        fetchOverviewData(iso),
        fetchEnvironmentalData(iso),
      ]);

      setDetailData({ embassyList, overview, environment });
      setModalVisible(true);
    } catch (err) {
      console.error("정보 불러오기 실패:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8FF" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <FeatureCard
            title="물가 비교하기"
            icon="🛏️"
            description="전세계 도시별 물가 비교"
            onPress={() => navigation.navigate("CostOfLiving")}
          />
          <FeatureCard
            title="예산 계산기"
            icon="💰"
            description="여행 예산을 쉽게 계획하세요"
            onPress={() => navigation.navigate("BudgetPlanner")}
          />
          <FeatureCard
            title="설정"
            icon="⚙️"
            description="앱 설정 및 기본값 변경"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>

        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>추천 인기 여행지</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedScroll}
          >
            {recommendedDestinations.map(({ city, country, flag }) => (
              <DestinationCard
                key={country}
                city={city}
                country={country}
                flag={flag}
                onPress={() => handleCardPress(country)}
              />
            ))}
          </ScrollView>
        </View>

        <TipCard />
      </ScrollView>

      <CountryInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        detailData={detailData}
      />
    </SafeAreaView>
  );
};

const FeatureCard: React.FC<{
  title: string;
  icon: string;
  description: string;
  onPress: () => void;
}> = ({ title, icon, description, onPress }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
    <CustomButton
      title="바로가기"
      onPress={onPress}
      style={styles.cardButton}
      textStyle={styles.cardButtonText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FAFF",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  cardsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 30,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  cardButton: {
    height: 36,
    backgroundColor: "#3B82F6",
  },
  cardButtonText: {
    fontSize: 14,
  },
  recommendedSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  recommendedScroll: {
    paddingHorizontal: 12,
    marginBottom: 5,
  },
});

export default HomeScreen;
