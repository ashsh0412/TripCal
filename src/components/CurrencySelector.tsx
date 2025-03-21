import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onChange: (currency: string) => void;
}

const currencyOptions = [
  { label: "미국 달러 (USD)", value: "USD" },
  { label: "한국 원 (KRW)", value: "KRW" },
  { label: "유로 (EUR)", value: "EUR" },
  { label: "일본 엔 (JPY)", value: "JPY" },
  { label: "영국 파운드 (GBP)", value: "GBP" },
  { label: "중국 위안 (CNY)", value: "CNY" },
  { label: "스위스 프랑 (CHF)", value: "CHF" },
];

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>기준 통화:</Text>

      {/* 선택된 통화 표시 및 모달 열기 */}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          {currencyOptions.find((c) => c.value === selectedCurrency)?.label}
        </Text>
      </TouchableOpacity>

      {/* 통화 선택 모달 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>통화 선택</Text>
            <FlatList
              data={currencyOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selector: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    width: 180,
    alignItems: "center",
  },
  selectedText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
});

export default CurrencySelector;
