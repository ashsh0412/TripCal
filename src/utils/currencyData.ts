// src/utils/currencyData.ts
import { fetchCountryData } from "./fetchCountryData";

interface CurrencyInfo {
  countryName: string;
  flag: string;
}

const preferredCountries: { [currencyCode: string]: string } = {
  USD: "United States",
  EUR: "European Union",
  KRW: "Korea (Republic of)",
  JPY: "Japan",
  GBP: "United Kingdom",
  CNY: "China",
};

export const getCurrencyData = async (): Promise<{
  [key: string]: CurrencyInfo;
}> => {
  const countryData = await fetchCountryData();
  if (!countryData) return {};

  const currencyData: { [key: string]: CurrencyInfo } = {};

  countryData.forEach((country: any) => {
    const currencies = country.currencies;
    const countryName = country.name.common;

    if (currencies) {
      Object.keys(currencies).forEach((currencyCode) => {
        const isPreferred = preferredCountries[currencyCode] === countryName;

        // 만약 preferred 국가거나, 아직 등록되지 않았으면 저장
        if (isPreferred || !currencyData[currencyCode]) {
          currencyData[currencyCode] = {
            countryName,
            flag: country.flags?.png || "",
          };
        }
      });
    }
  });

  return currencyData;
};
