import axios from "axios";

export const fetchCountryData = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("국가 데이터를 가져오는 중 오류 발생:", error);
    return null;
  }
};
