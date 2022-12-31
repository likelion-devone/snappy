import PropTypes from "prop-types";
import styled from "styled-components";

const StyleButton = styled.button`
  background-color: ${({ theme }) => theme.snWhite};
`;

function Button({ children, handleModalButton, ...props }) {
  return (
    <StyleButton type="button" onClick={handleModalButton} {...props}>
      {children}
    </StyleButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  handleModalButton: PropTypes.func.isRequired,
};

export default Button;
