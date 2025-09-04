import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import LocationSearch from "../components/LocationSearch";
import { fetchAllCountryData } from "../utils/fetchCountryInfoData";
import CountryDetailModal from "../components/CountryInfoModal";
import { fetchCountryCode } from "../utils/fetchCountryCode";
import { countryToAlpha2 } from "country-to-iso";
import { ScrollView } from "react-native";

const CountryInfoModal = () => {
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  const handleCityCountrySelect = (
    selectedCity: string,
    selectedCountry: string
  ) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
  };

  const handleSearch = async () => {
    if (!city.trim() || !country.trim()) {
      setError("도시와 나라를 모두 입력해주세요.");
      setModalVisible(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. 영어 이름 → ISO 코드 변환
      const isoCode = countryToAlpha2(country) ?? undefined;

      // 2. ISO 코드로 한국어 이름 조회
      const codeResults = await fetchCountryCode({ isoCode });
      if (!codeResults || codeResults.length === 0) {
        throw new Error("국가 변환 실패");
      }

      let { country_nm: koreanName, country_iso_alp2: isoAlpha2 } =
        codeResults[0];

      // 3. 외교부 API 조회
      const result = await fetchAllCountryData(koreanName, isoAlpha2);

      setDetailData(result);
      setModalVisible(true);
      console.log("✅ 통합 fetch 성공:", result);
    } catch (err) {
      console.error("❌ 통합 fetch 실패:", err);
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>여행지 정보 검색</Text>

        <LocationSearch onCitySelect={handleCityCountrySelect} />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>여행지 정보 검색 🔎</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading && (
          <Text style={styles.noDataText}>데이터를 불러오는 중...</Text>
        )}

        <View style={styles.cardContainer}>
          {/* 큰 카드 */}
          <View style={[styles.bigCard, { backgroundColor: "#fde68a" }]}>
            <Text style={styles.cardTag}>Global</Text>
            <Text style={styles.cardTitle}>여행 데이터</Text>
            <Text style={styles.cardDesc}>
              전 세계 주요 국가와 도시의 여행 정보를 한눈에 확인하세요
            </Text>
            <Text style={styles.cardFooter}>다양한 출처 기반</Text>
          </View>

          {/* 작은 카드 1 */}
          <View style={[styles.smallCard, { backgroundColor: "#bfdbfe" }]}>
            <Text style={styles.cardTag}>Official</Text>
            <Text style={styles.cardTitle}>외교부 인증</Text>
            <Text style={styles.cardDesc}>
              신뢰할 수 있는 공식 여행경보와 안전 지침을 제공합니다
            </Text>
            <Text style={styles.cardFooter}>공식 데이터 제공</Text>
          </View>

          {/* 작은 카드 2 */}
          <View style={[styles.smallCard, { backgroundColor: "#c7d2fe" }]}>
            <Text style={styles.cardTag}>Live</Text>
            <Text style={styles.cardTitle}>최신 안전 정보</Text>
            <Text style={styles.cardDesc}>
              여행 시 필요한 최신 동향과 안전 관련 소식을 빠르게 확인하세요
            </Text>
            <Text style={styles.cardFooter}>지속적 업데이트</Text>
          </View>
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeTitle}>📋 이용 안내</Text>
          <Text style={styles.noticeText}>
            • 도시명과 국가명을 정확히 입력하세요{"\n"}• 현재 영문 검색만
            지원됩니다{"\n"}• 대한한국은 검색 결과에서 제외됩니다 {"\n"}•
            자동완성 기능을 사용해 주세요
          </Text>
        </View>

        <CountryDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          data={detailData}
        />
      </View>
    </ScrollView>
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
    marginTop: 30,
    fontSize: 16,
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
  searchButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    marginTop: 24,
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bigCard: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  smallCard: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTag: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
    marginBottom: 10,
  },
  cardFooter: {
    fontSize: 12,
    color: "#6b7280",
    fontStyle: "italic",
  },
  noticeBox: {
    backgroundColor: "#fff7ed",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fdba74",
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#9a3412",
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 13,
    color: "#9a3412",
    lineHeight: 20,
  },
});

export default CountryInfoModal;
