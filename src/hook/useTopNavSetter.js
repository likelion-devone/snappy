import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { TopNavContext } from "component/common/Navbar/TopNavProvider";

/**
 * @typedef {Object.<{ title: string, left: React.ReactNode, right: React.ReactNode }>} TopNavSetterParam
 */

/**
 * @typedef {({left, right}: TopNavSetterParam) => void} TopNavSetter
 */
/**
 * @typedef {(element: React.ReactNode) => void} TopNavOnsideSetter
 */

export default function useTopNavSetter({ title = "Snappy", left, right }) {
  const { topNavDispatch } = useContext(TopNavContext);
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    if (!isMounted) {
      topNavDispatch({
        type: "initialize",
        title,
        left,
        right,
      });
      setIsMounted(true);
    }
  }, [topNavDispatch, left, right, title, isMounted]);

  /**
   * @type {TopNavSetter}
   */
  const setTopNavBoth = useCallback(
    ({ left, right }) => {
      topNavDispatch({
        type: "setBoth",
        left,
        right,
      });
    },
    [topNavDispatch]
  );

  /**
   * @type {TopNavOnsideSetter}
   */
  const setTopNavLeft = useCallback(
    (left) => {
      topNavDispatch({
        type: "setLeft",
        left,
      });
    },
    [topNavDispatch]
  );

  /**
   * @type {TopNavOnsideSetter}
   */
  const setTopNavRight = useCallback(
    (right) => {
      topNavDispatch({
        type: "setRight",
        right,
      });
    },
    [topNavDispatch]
  );

  return {
    setTopNavBoth,
    setTopNavLeft,
    setTopNavRight,
  };
}
