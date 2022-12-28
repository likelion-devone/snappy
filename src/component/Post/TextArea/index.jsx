import { useContext, useState, forwardRef } from "react";
import styled from "styled-components";

import StyledTextArea from "./style";
import { FONT_SIZE } from "constant/style";
import { IsUploadPossible } from "../IsUploadPossibleProvider/index";

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
  width: 50%;
  white-space: pre;
`;

const TextArea = forwardRef(function TextAreaForwarded(_, ref) {
  const { setPossibleUpload } = useContext(IsUploadPossible);
  const [text, setText] = useState("");

  const handleTextAreaChange = (event) => {
    handleTextAreaValidCheck(event);
    let currentText = event.target.value;
    setText(currentText);
  };

  const handleTextAreaValidCheck = (event) => {
    const {
      target: { value },
    } = event;
    const textAreaLength = value.length;

    if (!textAreaLength) {
      setPossibleUpload(false);
    }

    if (textAreaLength === 1) {
      setPossibleUpload(true);
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
        value={text}
        maxLength="500"
      />
    </Wrapper>
  );
});

export default TextArea;
