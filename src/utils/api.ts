import axios from "axios";
import { API_BASE_URL, EXCHANGE_RATE_API_KEY } from "../config/env";

export const fetchExchangeRates = async (baseCurrency: string = "USD") => {
  try {
    const url = `${API_BASE_URL}/${EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`;

    const response = await axios.get(url);

    // API 응답이 예상과 다르면 예외 처리
    if (!response.data || !response.data.conversion_rates) {
      throw new Error("환율 데이터를 찾을 수 없음");
    }

    return response.data.conversion_rates;
  } catch (error) {
    console.error("환율 데이터를 가져오는 중 오류 발생:", error);

    // ✅ 기본적으로 1:1 환율을 반환 (예: USD → USD = 1)
    return { [baseCurrency]: 1 };
  }
};
