import { useEffect, useRef } from "react";
import useAPI from "./useAPI";

/**
 * @typedef {Object.<string, any>} RequestConfigObject 요청하고 싶은 `req` 객체
 */

/**
 * 첫 렌더링시 바로 데이터를 얻고 싶은 경우 사용하는 Custom Hook
 *
 * @param {import('hook/useAPI').RequestConfigResolver} requestConfigResolver 요청하고 싶은 `req` 객체를 반환하는 함수
 * @returns {[isLoading:boolean, data:import('hook/useAPI').ResponseObject, error: import('hook/useAPI').ResponseObject]}
 */
export default function useFetch(requestConfigResolver, ...params) {
  const [isLoading, data, error, getData] = useAPI(requestConfigResolver);
  const paramRef = useRef(params);

  useEffect(() => {
    getData(...paramRef.current);
  }, [getData]);

  return [isLoading, data, error];
}
