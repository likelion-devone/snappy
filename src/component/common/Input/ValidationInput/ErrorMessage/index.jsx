import { useContext } from "react";
import styled from "styled-components";

import { ValidationInputContext } from "component/common/Input/ValidationInput";

import { FONT_SIZE } from "constant/style";

const StyledErrorMessage = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 14px;
  color: ${({ theme }) => theme.snRed};
  display: flex;
  align-items: flex-end;
  margin: -10px 0 16px; // 기존 margin-bottom 16px, 에러메시지 있으면 6px로 변경됩니다.
`;

export default function ErrorMessage() {
  const { errorMessage } = useContext(ValidationInputContext);

  return <StyledErrorMessage>{errorMessage}</StyledErrorMessage>;
}
