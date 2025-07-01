import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const termsOfService = `
[서비스 이용약관]

1. 본 앱은 해외 물가 및 환율 정보를 제공하는 목적의 서비스입니다.
2. 제공되는 정보는 공신력 있는 외부 데이터를 기반으로 하지만, 정확성을 100% 보장하지 않으며, 참고용으로만 사용해야 합니다.
3. 사용자의 개인 정보는 수집하지 않으며, 별도의 로그인 없이 앱을 사용할 수 있습니다.
4. 앱 내 오류나 제안 사항은 피드백 메뉴를 통해 전달해 주시기 바랍니다.
5. 본 약관은 사전 공지 없이 변경될 수 있으며, 변경 시 앱 내에 공지됩니다.

문의: ashsh0412@gmail.com
`;

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleBaseCurrencyPress = () => {
    Alert.alert("기준 통화 변경", "이후 업데이트 예정!");
  };

  const handleLanguagePress = () => {
    Alert.alert("언어 설정", "현재는 한국어만 지원됩니다.");
  };

  const handleFeedbackPress = () => {
    Alert.alert("피드백", "이메일: ashsh0412@gmail.com");
  };

  const handleTermsPress = () => {
    Alert.alert("서비스 이용약관", termsOfService);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>설정</Text>

      {/* 기본 설정 섹션 */}
      <Text style={styles.sectionTitle}>기본 설정</Text>

      <TouchableOpacity
        style={styles.itemRow}
        onPress={handleBaseCurrencyPress}
      >
        <View style={styles.leftSection}>
          <FontAwesome name="university" size={20} />
          <Text style={styles.itemText}>기준 통화 설정</Text>
        </View>
        <FontAwesome name="chevron-right" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemRow} onPress={handleLanguagePress}>
        <View style={styles.leftSection}>
          <FontAwesome name="globe" size={20} />
          <Text style={styles.itemText}>언어 설정</Text>
        </View>
        <FontAwesome name="chevron-right" size={20} />
      </TouchableOpacity>

      {/* 정보 섹션 */}
      <Text style={styles.sectionTitle}>앱 정보</Text>

      <View style={styles.itemRow}>
        <View style={styles.leftSection}>
          <FontAwesome name="info-circle" size={20} />
          <Text style={styles.itemText}>앱 버전 1.0.0</Text>
        </View>
      </View>

      <View style={styles.itemRow}>
        <View style={styles.leftSection}>
          <FontAwesome name="user" size={20} />
          <Text style={styles.itemText}>Developer : Sungho Baek</Text>
        </View>
      </View>

      {/* 고객지원 섹션 */}
      <Text style={styles.sectionTitle}>고객 지원</Text>

      <TouchableOpacity style={styles.itemRow} onPress={handleFeedbackPress}>
        <View style={styles.leftSection}>
          <FontAwesome name="envelope" size={20} />
          <Text style={styles.itemText}>피드백 보내기</Text>
        </View>
        <FontAwesome name="chevron-right" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemRow} onPress={handleTermsPress}>
        <View style={styles.leftSection}>
          <FontAwesome name="file-text-o" size={20} />
          <Text style={styles.itemText}>서비스 이용약관</Text>
        </View>
        <FontAwesome name="chevron-right" size={20} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginTop: 24,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default SettingsScreen;
