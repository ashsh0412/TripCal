const API_KEY =
  "Qr2O5wes5CPGZurRVzABPaj46gTlA36nWv5dUk4xsLztY/vAs77FUiRk7Q4B93ccWtY5XNbdxddn7u/rmCRD4g==";

export async function fetchEmbassyData(countryKor: string) {
  const res = await fetch(
    `https://apis.data.go.kr/1262000/EmbassyService2/getEmbassyList2?serviceKey=${encodeURIComponent(
      API_KEY
    )}&returnType=JSON&countryName=${countryKor}`
  );
  const json = await res.json();
  return json.data;
}

export async function fetchOverviewData(isoCode: string) {
  const res = await fetch(
    `https://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?serviceKey=${encodeURIComponent(
      API_KEY
    )}&returnType=JSON&isoCode=${isoCode}`
  );
  const json = await res.json();
  return json.data?.[0];
}

export async function fetchEnvironmentalData(isoCode: string) {
  const res = await fetch(
    `https://apis.data.go.kr/1262000/EnvironmentalInformationService/getEnvironmentalInformationList?serviceKey=${encodeURIComponent(
      API_KEY
    )}&returnType=JSON&isoCode=${isoCode}`
  );
  const json = await res.json();
  return json.data?.[0];
}
