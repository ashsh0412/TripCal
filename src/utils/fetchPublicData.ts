import { PUBLIC_API_KEY } from "../config/env";

// 외교부 국가, 지역별 재외공관 정보
export async function getQuote() {
  const response = await fetch(
    "https://apis.data.go.kr/1262000/EnvironmentalInformationService/getEnvironmentalInformationList" +
      `?serviceKey=${PUBLIC_API_KEY}` +
      "&pageNo=1&numOfRows=10" +
      "&cond[country_nm::EQ]=가나" +
      "&cond[country_iso_alp2::EQ]=GH"
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
  console.log(data);
}

// 외교부 국가, 지역별 일반사항
export async function getQuote2() {
  const response = await fetch(
    "https://apis.data.go.kr/1262000/OverviewGnrlInfoService/getOverviewGnrlInfoList" +
      `?serviceKey=${PUBLIC_API_KEY}` +
      "&pageNo=1&numOfRows=10" +
      "&cond[country_nm::EQ]=나미비아" +
      "&cond[country_iso_alp2::EQ]=NA"
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
  console.log(data);
}

// 외교부 국가, 지역별 종합환경 정보
export async function getQuote3() {
  const response = await fetch(
    "https://apis.data.go.kr/1262000/EnvironmentalInformationService/getEnvironmentalInformationList" +
      `?serviceKey=${PUBLIC_API_KEY}` +
      "&pageNo=1&numOfRows=10" +
      "&cond[country_nm::EQ]=가나" +
      "&cond[country_iso_alp2::EQ]=GH"
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
  console.log(data);
}
