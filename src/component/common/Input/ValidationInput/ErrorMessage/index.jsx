import { useContext } from "react";
import styled from "styled-components";

import { ValidationInputContext } from "component/common/Input/ValidationInput";

const StyledErrorMessage = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #eb5757;
  display: flex;
  align-items: flex-end;
  margin: -10px 0 16px; // 기존 margin-bottom 16px, 에러메시지 있으면 6px로 변경됨
`;

export default function ErrorMessage() {
  const { errorMessage } = useContext(ValidationInputContext);

  return <StyledErrorMessage>{errorMessage}</StyledErrorMessage>;
}
