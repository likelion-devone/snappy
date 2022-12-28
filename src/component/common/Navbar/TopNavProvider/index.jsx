import { createContext, useReducer, isValidElement } from "react"
import PropTypes from "prop-types";

/**
 * @type {React.Context<{title: string, left: React.ReactNode, right: React.ReactNode, topNavDispatch: React.DispatchWithoutAction }>}
 */
export const TopNavContext = createContext();

const topNavReducer = (state, action) => {
  if (
    (action.left && !isValidElement(action.left))
    || (action.right && !isValidElement(action.right))
  ) {
    throw Error("Top Nav에는 React Element만 넣을 수 있습니다.");
  }

  switch (action.type) {
    case "setTitle":
      return {
        ...state,
        title: action.title
      }
    case "setLeft":
      return {
        ...state,
        left: action.left,
      };
    case "setRight":
      return {
        ...state,
        right: action.right
      };
    case "setBoth":
      return {
        left: action.left,
        right: action.right
      }
    case "initialize":
      return {
        title: action.title,
        left: action.left,
        right: action.right
      }
    default:
      throw Error("TopNav Reducer 오류");
  }
}

const topNavInitState = {
  title: "Snappy",
  left: null,
  right: null
}

export default function TopNavProvider({ children }) {
  const [topNav, topNavDispatch] = useReducer(topNavReducer, topNavInitState);

  return (
    <TopNavContext.Provider value={{ ...topNav, topNavDispatch }}>
      {children}
    </TopNavContext.Provider>
  );
}

TopNavProvider.propTypes = {
  children: PropTypes.node.isRequired
}