import { useContext, useState, forwardRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import StyledTextArea from "./style";
import { FONT_SIZE } from "constant/style";
import { IsUploadPossibleContext } from "../IsUploadPossibleProvider/index";

const Wrapper = styled.div`
  position: relative;
  margin: 12px 0 0 12px;
  width: 100%;
`;

const DummyTextArea = styled.div`
  line-height: 18px;
  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  padding: 5px;
  white-space: pre;
`;

const TextArea = forwardRef(function TextAreaForwarded(props, ref) {
  const { defaultValue } = props;
  const { isPossibleToUpload, setIsPossibleToUpload } = useContext(
    IsUploadPossibleContext
  );
  const [text, setText] = useState(defaultValue ?? "");

  const handleTextAreaChange = (event) => {
    let currentText = event.target.value;
    handleTextAreaValidCheck(currentText);
    setText(currentText);
  };

  const handleTextAreaValidCheck = (currentText) => {
    const textAreaLength = currentText.length;

    if (!textAreaLength && isPossibleToUpload) {
      setIsPossibleToUpload(false);
    }

    if (textAreaLength && !isPossibleToUpload) {
      setIsPossibleToUpload(true);
    }
  };

  return (
    <Wrapper>
      <DummyTextArea>{text + "\n"}</DummyTextArea>
      <StyledTextArea
        ref={ref}
        autoFocus
        spellCheck={false}
        placeholder="게시글 입력하기..."
        onChange={handleTextAreaChange}
        maxLength="500"
        defaultValue={defaultValue}
      />
    </Wrapper>
  );
});

TextArea.propTypes = {
  defaultValue: PropTypes.string,
};
export default TextArea;
