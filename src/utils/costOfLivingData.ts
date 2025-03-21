import axios from "axios";

const API_KEY = "dbab5a7906msh0f25a8d66401762p1a0e1fjsncd442d25c6fd";
const API_HOST = "cost-of-living-and-prices.p.rapidapi.com";

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
