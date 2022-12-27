import { useCallback, useRef, useState } from "react";
import { req, server } from "lib/api";

/**
 * @typedef {Object.<string, any> | null} ResponseObject
 */
/**
 * @typedef {(...params) => Object.<string, any>} RequestConfigResolver
 */

/**
 * 백엔드 서버와 통신해 데이터를 가져와야 하는 경우 사용하는 Custom Hook
 *
 * @param {RequestConfigResolver} requestConfigResolver 요청하고 싶은 `req` 객체를 반환하는 함수
 * @returns {[isLoading:boolean, data:ResponseObject, error:ResponseObject, request: (...params) => Promise<ResponseObject>]} `[isLoading, data, request]` [데이터 로딩중 여부, 데이터, 데이터 요청시 사용해야 하는 함수]
 * @description `request` 함수는 사용시 필요한 param을 담아서 실행할 수 있습니다.
 */
export default function useAPI(requestConfigResolver) {
  const configResolverRef = useRef(requestConfigResolver);

  /**
   * @typedef {ResponseObject} Data
   * @typedef {React.Dispatch<Object.<string, any>>} DataSetter
   * @type {[Data, DataSetter]}
   */
  const [data, setData] = useState(null);

  /**
   * @typedef {ResponseObject} Error
   * @typedef {React.Dispatch<Object.<string, any>>} ErrorSetter
   * @type {[Error, ErrorSetter]}
   */
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (...params) => {
      setIsLoading(true);
      setData(null);
      setError(null);

      try {
        let result;

        if (
          Object.keys(req.noAuth).some(
            (key) => requestConfigResolver.name in req.noAuth[key]
          )
        ) {
          result = await server.noAuth(configResolverRef.current, ...params);
          setData(result);
        } else {
          result = await server(configResolverRef.current, ...params);
          setData(result);
        }

        setIsLoading(false);
        return result;
      } catch (error) {
        setIsLoading(false);
        setError(error);
        if (process.env.NODE_ENV === "development") {
          alert("서버에서 데이터를 가져오지 못했습니다.");
        }
      }
    },
    [requestConfigResolver.name]
  );

  return [isLoading, data, error, request];
}
