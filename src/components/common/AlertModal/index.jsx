import PropTypes from "prop-types";
import Button from "./Button/index";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 252px;
  background: #dbdbdb;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(64px, auto) 46px;
  gap: 1px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const AlertTitle = styled.p`
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-weight: 500;
  font-size: 16px;
  background-color: #ffffff;
`;

export default function AlertModal({ text, children }) {
  return (
    <Wrapper>
      <AlertTitle>{text}</AlertTitle>
      {children}
    </Wrapper>
  );
}

AlertModal.Button = Button;

AlertModal.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
