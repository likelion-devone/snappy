import { forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * 로그인, 이메일로 회원가입, 프로필 설정
 */
const AuthInput = forwardRef(function AuthInputForwarded(props, ref) {
  const { type = "text", id, labelText, ...restProps } = props;

  return (
    <InputContainer>
      <Label htmlFor={id}>{labelText}</Label>
      <Input type={type} ref={ref} {...restProps} />
    </InputContainer>
  );
});

AuthInput.propTypes = {
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
  font-size: 12px;
  line-height: 15px;
  color: #767676;
`;

const Input = styled.input`
  box-sizing: border-box; // TODO: 추후 GlobalStyle 수정시 삭제
  padding-top: 25px;
  margin-bottom: 16px;
  height: 48px;
  color: #000000;
  border-bottom: 1px solid #dbdbdb;
  :focus {
    border-bottom: 1px solid #33afd8;
    outline: none;
  }
  ::placeholder {
    color: #dbdbdb;
  }
`;

export default AuthInput;