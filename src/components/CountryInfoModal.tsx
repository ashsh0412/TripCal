import React from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

interface CountryDetailModalProps {
  visible: boolean;
  onClose: () => void;
  data: {
    overview?: any;
    embassyList?: any[];
    environment?: any;
  };
}

const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  visible,
  onClose,
  data,
}) => {
  const overview = data?.overview || {};
  const embassies = data?.embassyList || [];
  const env = data?.environment || {};

  const countryName = overview?.country_nm || "국가 정보";
  const countryFlag = getFlagEmoji(overview?.country_iso_alp2);

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.fullScreen}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {countryFlag} {countryName}
          </Text>
          <Button title="닫기" onPress={onClose} color="#EF4444" />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* 🌍 기본 정보 */}
          <Text style={styles.sectionTitle}>🌍 기본 정보</Text>
          <View style={styles.infoBox}>
            <Bullet label="수도" value={overview?.capital} />
            <Bullet
              label="면적"
              value={
                overview?.area
                  ? `${Number(overview.area).toLocaleString()}㎢ ${
                      overview?.area_desc || ""
                    }`
                  : null
              }
            />
            <Bullet
              label="인구"
              value={
                overview?.population
                  ? `${Number(overview.population).toLocaleString()}명 ${
                      overview?.population_desc || ""
                    }`
                  : null
              }
            />
            <Bullet label="민족 구성" value={overview?.ethnic} />
            <Bullet label="언어" value={overview?.lang} />
            <Bullet label="종교" value={overview?.religion} />
            <Bullet label="기후" value={overview?.climate} />
          </View>

          {/* 🏛️ 대사관 */}
          {embassies.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>🏛️ 대사관 및 영사관</Text>
              {embassies.map((e, index) => (
                <View key={index} style={styles.infoBox}>
                  <Text style={styles.bullet}>• {e.embassy_kor_nm}</Text>
                  <Text style={styles.subBullet}>
                    주소: {e.emblgbd_addr || "정보 없음"}
                  </Text>
                  <Text style={styles.subBullet}>
                    전화: {e.tel_no || "정보 없음"}
                  </Text>
                  <Text style={styles.subBullet}>
                    긴급 연락처: {e.urgency_tel_no || "정보 없음"}
                  </Text>
                </View>
              ))}
            </>
          )}

          {/* 🌱 환경 및 경제 지표 */}
          {Object.keys(env).length > 0 && (
            <>
              <Text style={styles.sectionTitle}>🌱 환경 및 경제 지표</Text>
              <View style={styles.infoBox}>
                <Bullet
                  label="소비자 물가 지수"
                  value={
                    env.consumer_price_idx != null
                      ? `${env.consumer_price_idx}`
                      : null
                  }
                />
                <Bullet
                  label="실업률"
                  value={
                    env.unemployment_rate != null
                      ? `${env.unemployment_rate}%`
                      : null
                  }
                />
                <Bullet
                  label="고용률"
                  value={
                    env.employment_rate != null
                      ? `${env.employment_rate}%`
                      : null
                  }
                />
                <Bullet
                  label="결핵 발생률"
                  value={
                    env.tuber_pr_hndrd_thsnd_ppl_outbreak_rate != null
                      ? `${env.tuber_pr_hndrd_thsnd_ppl_outbreak_rate} / 10만명`
                      : null
                  }
                />
                <Bullet
                  label="식수 이용률"
                  value={
                    env.clean_water_use_rate != null
                      ? `${env.clean_water_use_rate}%`
                      : null
                  }
                />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// 🔸 Bullet 텍스트 출력 컴포넌트
const Bullet = ({ label, value }: { label: string; value?: string | null }) => (
  <Text style={styles.bullet}>
    • {label}: {value ?? "정보 없음"}
  </Text>
);

// 🔸 국기 이모지 유틸
function getFlagEmoji(isoCode?: string): string {
  if (!isoCode || isoCode.length !== 2) return "🏳️";
  const codePoints = isoCode
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default CountryDetailModal;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 24,
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 20,
  },
  bullet: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 6,
  },
  subBullet: {
    fontSize: 13,
    color: "#6b7280",
    marginLeft: 16,
    marginBottom: 2,
    lineHeight: 18,
  },
});
