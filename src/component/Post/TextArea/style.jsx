import styled from "styled-components";
import { FONT_SIZE } from "constant/style";

const StyledTextArea = styled.textarea`
  position: absolute;
  inset: 0;
  height: 100%;
  padding: 5px;

  line-height: 18px;
  font-weight: 400;
  font-family: inherit;
  font-size: ${FONT_SIZE.BASE};
  color: ${({ theme }) => theme.snBlack};
  border-style: none;
  resize: none;
  overflow-y: hidden;

  ::placeholder {
    color: ${({ theme }) => theme.snGreyIcon};
  }

  :focus {
    outline-color: ${({ theme }) => theme.snBlue};
  }
`;

export default StyledTextArea;
