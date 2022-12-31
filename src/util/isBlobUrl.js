/**
 * URL이 blob인지 여부를 확인하는 함수
 *
 * @param {string} str
 * @returns {boolean}
 */
export default function isBlobUrl(str) {
  return /^blob:.*/.test(str) || /^test:.*/.test(str);
}
