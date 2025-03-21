import React from "react";
import { View, Text, StyleSheet } from "react-native";

// 팁 데이터 배열
const tips = [
  "여행지에서 현지 ATM을 사용할 때, 환전소보다 훨씬 유리한 환율을 제공하는 경우가 많습니다. 다만, 수수료가 붙을 수 있으므로, 인출 한도나 수수료를 미리 확인하세요.",
  "여행 전에는 건강 보험을 포함한 여행 보험에 가입하는 것이 중요합니다. 특히 의료비가 비싼 국가에서는 사고나 질병에 대비해 보험을 확인하고 가입하세요.",
  "대중교통을 이용하면 비용을 절감할 수 있을 뿐만 아니라, 현지 문화도 더 가까이에서 경험할 수 있습니다. 일부 도시에서는 관광객을 위한 할인 패스를 제공하니, 미리 조사해 보세요.",
  "현지 음식은 그 지역의 문화와 역사를 이해하는 좋은 방법입니다. 하지만 처음 먹어보는 음식은 음식의 성분이나 재료를 먼저 확인하고, 알레르기 반응에 대비하는 것이 좋습니다.",
  "인기 있는 관광지나 액티비티는 미리 예약을 해두면 긴 대기 시간을 줄일 수 있습니다. 특히 성수기에는 예약이 필수일 수 있습니다.",
  "여행지의 날씨를 정확히 확인하고, 기후에 맞는 옷을 준비하세요. 예상보다 기온 차이가 클 수 있으므로, 레이어링이 가능한 옷을 준비하는 것이 좋습니다.",
  "현지 화폐를 준비해 가는 것이 좋지만, 많은 국가에서 카드 결제가 일반적입니다. 특히 카드 수수료가 낮은 신용카드를 사용하면 좋습니다.",
  "여행지의 전압과 플러그 타입을 미리 확인하고, 필요한 어댑터를 준비하세요. 일부 전자기기는 전압 차이에 민감하므로, 변압기를 챙기는 것도 고려해 보세요.",
  "여행지의 최신 안전 정보를 확인하고, 정부나 지역 당국의 권고 사항을 따르세요. 위험 지역은 반드시 피하고, 현지의 안전 지침을 지키는 것이 중요합니다.",
  "현지 사람들과 대화할 때, 그들의 문화를 존중하는 태도가 중요합니다. 간단한 현지 언어 몇 마디라도 배우면, 더 따뜻한 환대를 받을 수 있습니다.",
];

// 랜덤 팁 선택
const randomTip = tips[Math.floor(Math.random() * tips.length)];

const TipCard = () => {
  return (
    <View style={styles.tipContainer}>
      <Text style={styles.tipTitle}>💡 여행 팁</Text>
      <Text style={styles.tipText}>{randomTip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TipCard;
