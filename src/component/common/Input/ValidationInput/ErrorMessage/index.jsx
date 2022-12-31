import { useContext } from "react";
import styled from "styled-components";

import { ValidationInputContext } from "component/common/Input/ValidationInput";

import { FONT_SIZE } from "constant/style";

const ErrorMessage = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 14px;
  color: ${({ theme, $isValid }) => $isValid ? theme.snBlue : theme.snRed};
  display: flex;
  align-items: flex-end;
  margin: -10px 0 16px; // 기존 margin-bottom 16px, 에러메시지 있으면 6px로 변경됩니다.
`;

export function ErrorMessageForValidationInput({ ...props }) {
  const { errorMessage } = useContext(ValidationInputContext);

  return <ErrorMessage {...props}>{errorMessage}</ErrorMessage>;
}

export default ErrorMessage;