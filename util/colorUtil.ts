// hex에 alpha값을 넣어 rgba 리턴
export default function applyAlpha(hex: string, alpha: number): string {
  // HEX 색상에서 #을 제거
  const trimmedHex = hex.replace("#", "");

  // HEX를 RGB로 변환
  const bigint = parseInt(trimmedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
