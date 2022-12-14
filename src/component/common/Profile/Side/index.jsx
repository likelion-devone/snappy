import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Title from "./Title";

const Wrapper = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 12px;
`;

export default function Side({ left, center, right }) {
  return (
    <Wrapper>
      {!!left && left}
      {!!center && center}
      {!!right && right}
    </Wrapper>
  );
}

Side.Title = Title;

Side.propTypes = {
  left: PropTypes.element,
  center: PropTypes.element,
  right: PropTypes.element,
};
