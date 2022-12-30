import PropTypes from "prop-types";
import { useRef } from "react";
import styled from "styled-components";

import Button from "./Button/index";
import { cssModalBackground } from "../style";

//https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Using_Touch_Events
//https://nohack.tistory.com/123
//https://www.codicode.com/art/easy_way_to_add_touch_support_to_your_website.aspx
//https://ui.toast.com/weekly-pick/ko_20220106

const ModalSection = styled.section`
  ${cssModalBackground}
  align-items: flex-end;
`;

const Modal = styled.ul`
  width: 100%;
  background-color: ${({ theme }) => theme.snWhite};
  border-radius: 10px 10px 0 0;
  padding: 0 0 8px;
  overflow: hidden;

  position: relative;

  .touch-bar {
    width: 100%;
    height: 36px;

    ::before {
      content: "";

      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);

      width: 50px;
      height: 4px;
      background-color: ${({ theme }) => theme.snGreyOff};
      border-radius: 5px;
    }
  }

  @keyframes growUp {
    0% {
      transform: scaleY(0.9);
    }

    100% {
      transform: scaleY(1);
    }
  }

  animation: 600ms growUp;
  transform-origin: bottom center;
`;

export default function DropdownModal({ isDroppedUp, dropDown, children }) {
  const modalRef = useRef(null);
  const touchbarRef = useRef(null);

  function handleModalSection(event) {
    if (
      event.target !== modalRef.current &&
      event.target !== touchbarRef.current
    ) {
      dropDown();
    }
    return;
  }

  // TODO 터치기능 구현
  return (
    isDroppedUp && (
      <ModalSection onClick={handleModalSection}>
        <h2 className="sr-only">모달</h2>
        <Modal ref={modalRef}>
          <li className="touch-bar" ref={touchbarRef}></li>
          {children}
        </Modal>
      </ModalSection>
    )
  );
}

DropdownModal.Button = Button;

DropdownModal.propTypes = {
  isDroppedUp: PropTypes.bool.isRequired,
  dropDown: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
