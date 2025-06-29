import React from "react";
import { Modal, ScrollView, View, Text, Button } from "react-native";

interface CountryInfoModalProps {
  visible: boolean;
  onClose: () => void;
  detailData: any;
}

const CountryInfoModal: React.FC<CountryInfoModalProps> = ({
  visible,
  onClose,
  detailData,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Button title="닫기" onPress={onClose} />

        {detailData?.overview && (
          <>
            <Text>국가명: {detailData.overview.country_nm}</Text>
            <Text>수도: {detailData.overview.capital}</Text>
            <Text>인구: {detailData.overview.population}</Text>
            <Text>면적: {detailData.overview.area}</Text>
            <Text>언어: {detailData.overview.lang}</Text>
            <Text>종교: {detailData.overview.religion}</Text>
            <Text>건국: {detailData.overview.establish}</Text>
          </>
        )}

        {detailData?.environment && (
          <>
            <Text>기후: {detailData.environment.climate}</Text>
            <Text>실업률: {detailData.environment.unemployment_rate}</Text>
            <Text>
              깨끗한 물 사용률: {detailData.environment.clean_water_use_rate}
            </Text>
          </>
        )}

        {detailData?.embassyList?.map((emb: any, idx: number) => (
          <View key={idx} style={{ marginTop: 10 }}>
            <Text>공관명: {emb.embassy_kor_nm}</Text>
            <Text>주소: {emb.embassy_addr}</Text>
            <Text>대표전화: {emb.tel_no}</Text>
            <Text>긴급전화: {emb.urgency_tel_no}</Text>
          </View>
        ))}
      </ScrollView>
    </Modal>
  );
};

export default CountryInfoModal;
