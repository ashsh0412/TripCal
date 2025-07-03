import { PUBLIC_API_KEY } from "../config/env";

// 외교부 국가, 지역별 재외공관 정보
export async function fetchEmbassyInfo(countryName: string, isoCode: string) {
  const response = await fetch(
    "https://apis.data.go.kr/1262000/EmbassyService2/getEmbassyList2" +
      `?serviceKey=${PUBLIC_API_KEY}` +
      "&pageNo=1&numOfRows=10" +
      `&cond[country_nm::EQ]=${countryName}` +
      `&cond[country_iso_alp2::EQ]=${isoCode}`,
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );

  const data = await response.json();
  return data;
}

// 외교부 국가, 지역별 일반사항
export async function fetchCountryOverview(
  countryName: string,
  isoCode: string
) {
  const response = await fetch(
    "https://apis.data.go.kr/1262000/OverviewGnrlInfoService/getOverviewGnrlInfoList" +
      `?serviceKey=${PUBLIC_API_KEY}` +
      "&pageNo=1&numOfRows=10" +
      `&cond[country_nm::EQ]=${countryName}` +
      `&cond[country_iso_alp2::EQ]=${isoCode}`,
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );

  const data = await response.json();
  return data;
}

// 외교부 국가, 지역별 종합환경 정보
export async function fetchEnvironmentalInfo(
  countryName: string,
  isoCode: string
) {
  const response = await fetch(
    "https://apis.data.go.kr/1262000/EnvironmentalInformationService/getEnvironmentalInformationList" +
      `?serviceKey=${PUBLIC_API_KEY}` +
      "&pageNo=1&numOfRows=10" +
      `&cond[country_nm::EQ]=${countryName}` +
      `&cond[country_iso_alp2::EQ]=${isoCode}`,
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function fetchAllCountryData(
  countryName: string,
  isoCode: string
) {
  try {
    const [overview, embassyList, environment] = await Promise.all([
      fetchCountryOverview(countryName, isoCode),
      fetchEmbassyInfo(countryName, isoCode),
      fetchEnvironmentalInfo(countryName, isoCode),
    ]);

    return {
      overview: overview?.response?.body?.items?.item?.[0] || {},
      embassyList: embassyList?.response?.body?.items?.item || [],
      environment: environment?.response?.body?.items?.item?.[0] || {},
    };
  } catch (error) {
    console.error("통합 국가 정보 fetch 실패:", error);
    throw error;
  }
}
