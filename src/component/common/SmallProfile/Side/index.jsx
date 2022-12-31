import styled from "styled-components";
import PropTypes from "prop-types";

import Title from "./Title";

const Wrapper = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  & * + * {
    flex-shrink: 0;
  }
`;

export default function Side({ left, right }) {
  return (
    <Wrapper>
      {!!left && left}
      {!!right && right}
    </Wrapper>
  );
}

Side.Title = Title;

Side.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
};
