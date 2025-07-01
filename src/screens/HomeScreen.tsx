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
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import CustomButton from "../components/CustomButton";
import TipCard from "../components/TipCard";
import DestinationCard from "../components/DestinationCard";
import { fetchAllCountryData } from "../utils/fetchPublicData";
import CountryDetailModal from "../components/CountryInfoModal";

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const recommendedDestinations = [
  { city: "도쿄", country: "일본", code: "JP", flag: "🇯🇵" },
  { city: "방콕", country: "태국", code: "TH", flag: "🇹🇭" },
  { city: "파리", country: "프랑스", code: "FR", flag: "🇫🇷" },
  { city: "뉴욕", country: "미국", code: "US", flag: "🇺🇸" },
  { city: "시드니", country: "호주", code: "AU", flag: "🇦🇺" },
  { city: "로마", country: "이탈리아", code: "IT", flag: "🇮🇹" },
  { city: "런던", country: "영국", code: "GB", flag: "🇬🇧" },
  { city: "하노이", country: "베트남", code: "VN", flag: "🇻🇳" },
  { city: "베를린", country: "독일", code: "DE", flag: "🇩🇪" },
  { city: "리우", country: "브라질", code: "BR", flag: "🇧🇷" },
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  const handleDestinationPress = async (country: string, code: string) => {
    try {
      const result = await fetchAllCountryData(country, code);
      setDetailData(result);
      setModalVisible(true);
    } catch (err) {
      console.error("❌ 통합 fetch 실패:", err);
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
            {recommendedDestinations.map(({ city, country, code, flag }) => (
              <DestinationCard
                key={country}
                city={city}
                country={country}
                flag={flag}
                onPress={() => handleDestinationPress(country, code)}
              />
            ))}
          </ScrollView>
        </View>

        <TipCard />
      </ScrollView>

      {/* 모달 컴포넌트 */}
      <CountryDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={detailData}
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
    shadowOffset: { width: 0, height: 2 },
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
