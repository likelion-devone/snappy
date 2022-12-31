import { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { FONT_SIZE } from "constant/style";

/**
 * 로그인, 이메일로 회원가입, 프로필 설정
 */
const LabeledInput = forwardRef(function LabeledInputForwarded(props, ref) {
  const { type = "text", id, labelText, ...restProps } = props;

  return (
    <InputContainer>
      <Label htmlFor={id}>{labelText}</Label>
      <Input id={id} type={type} ref={ref} {...restProps} />
    </InputContainer>
  );
});

LabeledInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
};

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

/**
 * 이메일, 비밀번호
 */
const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: 500;
  font-size: ${FONT_SIZE.MEDIUM};
  line-height: 15px;
  color: ${({ theme }) => theme.snGrayIcon};
`;

const Input = styled.input`
  padding-top: 25px;
  margin-bottom: 16px;
  height: 48px;
  color: ${({ theme }) => theme.snBlack};
  border-bottom: 1px solid ${({ theme }) => theme.snGreyOff};
  :focus {
    border-bottom: 1px solid ${({ theme }) => theme.snBlue};
    outline: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.snGreyOff};
  }
`;

export default LabeledInput;
