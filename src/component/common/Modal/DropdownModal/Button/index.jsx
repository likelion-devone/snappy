import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  padding: 14px 26px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;

  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  font-family: inherit;
`;

export default function Button({ children, onClick, ...props }) {
  return (
    <li>
      <StyledButton type="button" onClick={onClick} {...props}>
        {children}
      </StyledButton>
    </li>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
