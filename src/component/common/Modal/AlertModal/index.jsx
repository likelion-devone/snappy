import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button/index";
import { FONT_SIZE } from "constant/style";
import { cssModalBackground } from "../style";

const cssOpenModal = css`
  scale: 1;
`
const cssCloseModal = css`
  scale: 0;
`

const Wrapper = styled.div`
  ${cssModalBackground}

  align-items: center;
  justify-content: center;

  ${({ $isModalOpened }) =>
    $isModalOpened ? cssOpenModal : cssCloseModal
  }
`

const Modal = styled.div`
  width: 252px;
  background: ${({ theme }) => theme.snGreyOff};
  border-radius: 10px;

  display: grid;
  grid-template-columns: repeat(${({ children }) => children.length - 1}, 1fr);
  grid-template-rows: minmax(64px, auto) 46px;
  gap: 1px 0px;
  ${({ children }) =>
    children.length >= 3 &&
    css`
      gap: 1px 1px;
    `}

  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;

  & *:first-child {
    grid-column: 1 / ${({ children }) => children.length};
  }

  transition: all 0.5s ease;
  ${({ $isModalOpened }) =>
    $isModalOpened ? cssOpenModal : cssCloseModal
  }
`;

const Content = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-weight: 500;
  font-size: ${FONT_SIZE.LARGE};

  line-height: 1.6;

  background-color: ${({ theme }) => theme.snWhite};
`;

export default function AlertModal({ isModalOpened, children }) {
  return (
    <Wrapper $isModalOpened={isModalOpened}>
      <Modal $isModalOpened={isModalOpened}>
        {children}
      </Modal>
    </Wrapper>
  );
}

AlertModal.Content = Content;
AlertModal.Cancle = Button;
AlertModal.ConfirmButton = styled(Button)`
  color: ${({ theme }) => theme.snBlue};
`;

AlertModal.propTypes = {
  isModalOpened: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
