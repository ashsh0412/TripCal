import { useState, useEffect } from "react";
import { fetchExchangeRates } from "./currency_api";

export const useExchangeRate = (baseCurrency: string = "USD") => {
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRates = async () => {
      setLoading(true);
      const data = await fetchExchangeRates(baseCurrency);
      if (data) {
        setRates(data);
      } else {
        setError("환율 데이터를 가져오는 데 실패했습니다.");
      }
      setLoading(false);
    };

    getRates();
  }, [baseCurrency]);

  return { rates, loading, error };
};
