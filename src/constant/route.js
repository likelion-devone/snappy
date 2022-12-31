const ROUTE = {
  LANDING: "/",
  LOGIN: "/login",
  HOME: "/home",
  PROFILE: "/profile",
  POST: "/post",
  CHAT: "/chat",
  PRODUCT: "/product",
};

const ROUTE_LOGIN = {
  JOIN: "join",
  AUTHORIZE: "authorize",
};

const ROUTE_CHAT = {
  CHATROOM: "chatroom",
};

const ROUTE_PRODUCT = {
  ADD: "add",
  EDIT: "edit",
};

const ROUTE_POST = {
  EDIT: "edit",
};
const ROUTE_PROFILE = {
  EDIT: "edit",
  FOLLOWER: "follower",
  FOLLOWING: "following",
};

export { ROUTE_PRODUCT, ROUTE_POST, ROUTE_PROFILE, ROUTE_CHAT, ROUTE_LOGIN };

export default ROUTE;
