/**
 * 인자가 Promise인지 여부를 확인하는 함수
 *
 * @param {ant} p
 * @returns {boolean}
 */
const isPromise = (p) => {
  if (typeof p === "object" && typeof p.then === "function") {
    return true;
  }

  return false;
};

/**
 * 인자가 Promise를 리턴하는 함수인지 여부를 확인하는 함수
 *
 * @param {any | Function} f
 * @returns {boolean}
 */
const returnsPromise = (f) => {
  if (
    f.constructor.name === "AsyncFunction" ||
    (typeof f === "function" && isPromise(f()))
  ) {
    return true;
  }

  return false;
};

export { isPromise, returnsPromise };
