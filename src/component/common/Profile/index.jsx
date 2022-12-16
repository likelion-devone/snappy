import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import Side from "./Side";

import { PROFILE_SIZE } from "constant/sizes";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

const Img = styled.img`
  overflow: hidden;
  border-radius: 50%;
  ${({ size }) => sizeStyleMap[size] ?? ""}
`;

const sizeStyleMap = {
  xs: css`
    width: 36px;
    height: 36px;
  `,
  sm: css`
    width: 42px;
    height: 42px;
  `,
  md: css`
    width: 50px;
    height: 50px;
  `,
  lg: css`
    width: 110px;
    height: 110px;
  `,
};

export default function Profile({ size, left, right, topLeft, bottomRight }) {
  if (process.env.NODE_ENV === "development") {
    return (
      <Wrapper>
        {!!left && left}
        <Img src={"https://fakeimg.pl/110x110/"} alt="" size={size} />
        {!!right && right}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        {!!left && left}
        <Img src="" alt="" size={size} />
        {!!right && right}
      </Wrapper>
    );
  }
}

Profile.propTypes = {
  size: PropTypes.oneOf(Object.values(PROFILE_SIZE)).isRequired,
  left: PropTypes.element,
  right: PropTypes.element,
  topLeft: PropTypes.element,
  bottomRight: PropTypes.element,
};

Profile.Side = Side;
