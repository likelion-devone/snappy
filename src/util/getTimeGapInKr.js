const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const MONTH = 2592000;

function millisecondInKr(ms) {
  const postDate = new Date(ms);
  const year = postDate.getFullYear();
  const month = postDate.getMonth() + 1;
  const day = postDate.getDate();
  return [year, month, day];
}

export default function getTimeGapInKr(time) {
  const ms = Date.parse(time);
  const now = Date.now();
  const gap = (now - ms) / 1000;

  if (gap < MINUTE) {
    return "방금 전";
  } else if (gap < HOUR) {
    return `${Math.floor(gap / MINUTE)}분 전`;
  } else if (gap < DAY) {
    return `${Math.floor(gap / HOUR)}시간 전`;
  } else if (gap < MONTH) {
    return `${Math.floor(gap / DAY)}일 전`;
  } else {
    const [year, month, day] = millisecondInKr(ms);
    return `${year}년 ${month}월 ${day}일`;
  }
}
