import React from "react";
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

// 타입 명시
type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8FF" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 기능 카드 섹션 */}
        <View style={styles.cardsContainer}>
          <FeatureCard
            title="환율 비교하기"
            icon="💱"
            description="실시간 환율 정보와 환전 계산기"
            onPress={() => navigation.navigate("ExchangeRate")}
          />
          <FeatureCard
            title="물가 비교하기"
            icon="🛒"
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

        {/* 추천 여행지 섹션 */}
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>인기 여행지 물가 정보</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedScroll}
          >
            {/* 여행지 카드들 */}
            <DestinationCard city="도쿄" country="일본" flag="🇯🇵" />
            <DestinationCard city="방콕" country="태국" flag="🇹🇭" />
            <DestinationCard city="파리" country="프랑스" flag="🇫🇷" />
            <DestinationCard city="뉴욕" country="미국" flag="🇺🇸" />
            <DestinationCard city="시드니" country="호주" flag="🇦🇺" />
            <DestinationCard city="로마" country="이탈리아" flag="🇮🇹" />
            <DestinationCard city="런던" country="영국" flag="🇬🇧" />
            <DestinationCard city="하노이" country="베트남" flag="🇻🇳" />
            <DestinationCard city="베를린" country="독일" flag="🇩🇪" />
            <DestinationCard city="리우" country="브라질" flag="🇧🇷" />
          </ScrollView>
        </View>

        {/* 팁 섹션 */}
        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>💡 여행 팁</Text>
          <Text style={styles.tipText}>
            현지 ATM 사용 시 대부분 현지 통화 인출이 환전소보다 저렴합니다.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 기능 카드 컴포넌트
type FeatureCardProps = {
  title: string;
  icon: string;
  description: string;
  onPress: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  icon,
  description,
  onPress,
}) => (
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

// 여행지 카드 컴포넌트
// Define the props type for DestinationCard
type DestinationCardProps = {
  city: string;
  country: string;
  flag: string;
};

const DestinationCard: React.FC<DestinationCardProps> = ({
  city,
  country,
  flag,
}) => (
  <View style={styles.destinationCard}>
    <Text style={styles.destinationFlag}>{flag}</Text>
    <Text style={styles.destinationCity}>{city}</Text>
    <Text style={styles.destinationCountry}>{country}</Text>
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
  header: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  headerGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    paddingHorizontal: 20,
  },
  worldMapImage: {
    width: "80%",
    height: 80,
    opacity: 0.6,
    position: "absolute",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
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
  destinationCard: {
    width: 120,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 8,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  destinationFlag: {
    fontSize: 40,
    marginBottom: 10,
  },
  destinationCity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  destinationCountry: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  tipContainer: {
    backgroundColor: "#E1F5FE",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4481EB",
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default HomeScreen;
