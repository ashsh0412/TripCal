import axios from "axios";
import { API_KEY, API_HOST } from "../config/env";

export const fetchPricesByCityCountry = async (
  city: string,
  country: string
) => {
  try {
    const response = await axios.get(
      "https://cost-of-living-and-prices.p.rapidapi.com/prices",
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
        params: { city_name: city, country_name: country },
      }
    );

    if (response.data && response.data.prices) {
      return response.data.prices;
    } else {
      throw new Error("물가 정보를 가져오는 데 실패했습니다.");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchCities = async () => {
  try {
    const response = await axios.get(
      "https://cost-of-living-and-prices.p.rapidapi.com/cities",
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": API_HOST,
        },
      }
    );
    return response.data.cities; // 도시 목록 반환
  } catch (error) {
    console.error("도시 목록을 가져오는 중 에러 발생:", error);
    return [];
  }
};
