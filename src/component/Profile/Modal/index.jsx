import PropTypes from "prop-types";
import styled from "styled-components";

const FullScreenImage = styled.div`
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid yellow;
  margin: 0 auto;
`;
const CloseButton = styled.button`
  width: 100px;
  height: 100px;
  background-color: blue;
`;

function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <FullScreenImage>
      <CloseButton type="button" onClick={onClose}>
        Close Modal
      </CloseButton>
      {children}
    </FullScreenImage>
  );
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.bool,
};

export default Modal;
