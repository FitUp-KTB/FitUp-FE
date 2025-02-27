
// 배열에서 부족한 개수 채우기(number는 0, string은 "")
const fillMissingData = <T extends number | string>(data: T[], n: number = 7): T[] =>  {
  const defaultValue: T = (typeof data[0] === "number" ? 0 : "") as T; // ✅ 타입에 따른 기본값 결정
  const missingCount = n - data.length; // ✅ 부족한 개수 계산

  if (missingCount > 0) {
    return Array(missingCount).fill(defaultValue).concat(data); // ✅ 부족한 개수만큼 채우기
  }

  return data;
};

export { fillMissingData };
