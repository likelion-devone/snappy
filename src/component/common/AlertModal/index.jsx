import styled from "styled-components";
import PropTypes from "prop-types";

import Button from "./Button/index";
import { FONT_SIZE } from "constant/style";

const Wrapper = styled.div`
  width: 252px;
  background: ${({ theme }) => theme.snGreyOff};
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(64px, auto) 46px;
  gap: 1px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const Content = styled.p`
  grid-column: 1 / 3;
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
  return (isModalOpened &&
    <Wrapper>
      {children}
    </Wrapper>
  );
}

AlertModal.Content = Content;
AlertModal.CancleButton = Button;
AlertModal.ConfirmButton = styled(Button)`
  color: ${({ theme }) => theme.snBlue};
`

AlertModal.propTypes = {
  isModalOpened: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
