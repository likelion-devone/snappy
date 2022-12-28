import { useContext } from "react";
import styled from "styled-components";

import { cssNavbar } from "../style/css";
import { TopNavContext } from "../TopNavProvider";

import { TOP_NAVBAR_HEIGHT } from "constant/style";

import Title from "./Title";
import TopNavButton, { GoBackButton, MoreButton, SearchButton } from "./Button";

const Wrapper = styled.header`
  ${cssNavbar}
  top:0;
  border-bottom: 1px solid ${({ theme }) => theme.snGreyOff};

  justify-content: space-between;

  padding: 13px 16px;

  height: ${TOP_NAVBAR_HEIGHT};

`

export default function TopNav() {
  const { title, left, right } = useContext(TopNavContext);

  if (!left || !right) {
    return <></>
  }

  const hasHeadingElement = [
    right.type,
    right.type.target,
    left.type,
    left.type.target
  ].includes("h1");

  return (
    <Wrapper>
      {!hasHeadingElement
        && <h1 className="sr-only">{title}</h1>}
      {left}
      {right}
    </Wrapper>
  )
}

const TopNavElement = {};

TopNavElement.Title = Title;
TopNavElement.GoBackButton = GoBackButton;
TopNavElement.MoreButton = MoreButton;
TopNavElement.SearchButton = SearchButton;
TopNavElement.Button = TopNavButton;

const TopNavWrapper = Wrapper;

export { TopNavElement, TopNavWrapper };
