// "2025-02-27" 형식의 string이 오늘인지 판별하는 함수
const checkIsToday = (stringDate: string): boolean => {
  const givenDate = new Date(stringDate); // 문자열을 Date 객체로 변환
  const today = new Date(); // 현재 날짜 가져오기

  return (
    givenDate.getFullYear() === today.getFullYear() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getDate() === today.getDate()
  );
}

export {checkIsToday}
