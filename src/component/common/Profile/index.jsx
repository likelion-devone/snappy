import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// import DefaultProfile from "assets/images/default_profile.png";
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
`;

export default function Profile({ size, left, right, topLeft, bottomRight }) {
  // if (process.env.NODE_ENV === "development") {
  // }

  return (
    <Wrapper>
      {!!left && left}
      <Img src={"https://fakeimg.pl/42x42/"} alt="" />
      {!!right && right}
    </Wrapper>
  );
}

Profile.propTypes = {
  size: PropTypes.oneOf(Object.values(PROFILE_SIZE)).isRequired,
  left: PropTypes.element,
  right: PropTypes.element,
  topLeft: PropTypes.element,
  bottomRight: PropTypes.element,
};

// https://fakeimg.pl/110x110/
// https://fakeimg.pl/50x50/
// https://fakeimg.pl/42x42/
// https://fakeimg.pl/36x36/

Profile.Side = Side;
