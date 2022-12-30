import { forwardRef } from "react";
import styled from "styled-components";

import Icons from "asset/icon/icons";

const StyledLabel = styled.label`
  width: 36px;
  height: 36px;
  padding: 7px;

  background-color: ${({ theme }) => theme.snBlue};
  border-radius: 50%;

  cursor: pointer;
`

const UploadProfileImageLabel = forwardRef(function ForwardedUploadProfileImageInput(props, ref) {
  return (
    <StyledLabel>
      <Icons.Image title="프로필 업로드 버튼입니다." />
      <input ref={ref} type="file" className="sr-only" accept="image/*" name="profileImg" {...props} />
    </StyledLabel>
  )
})

export default UploadProfileImageLabel;