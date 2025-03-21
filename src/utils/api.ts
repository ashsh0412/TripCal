import axios from "axios";
import { API_BASE_URL, EXCHANGE_RATE_API_KEY } from "../config/env";

export const fetchExchangeRates = async (baseCurrency: string = "USD") => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`
    );
    return response.data.conversion_rates;
  } catch (error) {
    console.error("환율 데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
};
