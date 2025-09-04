import { PUBLIC_API_KEY } from "../config/env";

// 외교부_국가·지역별 표준코드 조회
export async function fetchCountryCode({
  koreanName,
  englishName,
  isoCode,
  pageNo = 1,
  numOfRows = 10,
}: {
  koreanName?: string;
  englishName?: string;
  isoCode?: string;
  pageNo?: number;
  numOfRows?: number;
}) {
  try {
    let query = "";

    if (koreanName) {
      query += `&cond[country_nm::EQ]=${koreanName}`;
    }
    if (englishName) {
      query += `&cond[country_eng_nm::EQ]=${englishName}`;
    }
    if (isoCode) {
      query += `&cond[country_iso_alp2::EQ]=${isoCode}`;
    }

    const url =
      "https://apis.data.go.kr/1262000/CountryCodeService3/getCountryCodeList3" +
      `?serviceKey=${PUBLIC_API_KEY}` +
      `&returnType=JSON` +
      `&pageNo=${pageNo}&numOfRows=${numOfRows}` +
      query;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    return data?.response?.body?.items?.item || [];
  } catch (error) {
    console.error("❌ 국가 코드 API fetch 실패:", error);
    throw error;
  }
}
