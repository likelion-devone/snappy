import { createContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

export const JoinDataContext = createContext();

const joinDataInitState = {
  email: "",
  password: "",
  username: "",
  accountname: "",
  intro: "",
  image: "",
}

const joinDataReducer = (state, action) => {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.payload,
      }
    case "password":
      return {
        ...state,
        password: action.payload,
      }
    case "username":
      return {
        ...state,
        username: action.payload,
      }
    case "accountname":
      return {
        ...state,
        accountname: action.payload,
      }
    case "intro":
      return {
        ...state,
        intro: action.payload,
      }
    case "image":
      return {
        ...state,
        image: action.payload
      }
    case "reset":
      return { ...joinDataInitState }
    default:
      throw new Error("joinDataReducer 오류");
  }
}

export default function JoinPage() {
  const [joinData, dispatchJoinData] = useReducer(joinDataReducer, joinDataInitState);

  return (
    <JoinDataContext.Provider value={{ joinData, dispatchJoinData }}>
      <Outlet />
    </JoinDataContext.Provider>
  )
}