import STORAGE_KEY from "constant/storage_keys";

/**
 * 로그인 토큰 로컬 스토리지에서 로드
 *
 * @returns {string}
 */
const getTokenFromLocalStorage = () =>
  localStorage.getItem(STORAGE_KEY.TOKEN) ?? "";

/**
 * 로그인 토큰 로컬 스토리지에서 삭제
 *
 * @returns {void}
 */
const removeTokenOnLocalStorage = () =>
  localStorage.removeItem(STORAGE_KEY.TOKEN);

/**
 * 로그인 토큰 로컬 스토리지에 저장
 *
 * @param {string} token 로그인 토큰
 * @returns {void}
 */
const setTokenOnLocalStorage = (token) =>
  localStorage.setItem(STORAGE_KEY.TOKEN, token) ?? "";

export {
  getTokenFromLocalStorage,
  setTokenOnLocalStorage,
  removeTokenOnLocalStorage,
};
