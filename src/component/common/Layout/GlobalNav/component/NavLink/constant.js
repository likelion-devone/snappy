import { Home, MessageCircle, Edit, User } from "../index";

import ROUTE from "constant/route";

const NavLinkMap = {
  HOME: {
    to: ROUTE.HOME,
    icon: Home,
    text: "홈",
  },
  CHAT: {
    to: ROUTE.CHAT,
    icon: MessageCircle,
    text: "채팅",
  },
  POST: {
    to: ROUTE.POST,
    icon: Edit,
    text: "게시물 작성",
  },
  PROFILE: {
    to: ROUTE.PROFILE,
    icon: User,
    text: "프로필",
  },
};

export { NavLinkMap };
