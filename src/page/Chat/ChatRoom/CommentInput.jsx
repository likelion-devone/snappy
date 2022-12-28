import Icons from "asset/icon/icons";
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Form } from "react-router-dom";

const FormLabel = styled.label`
  margin: 0 auto;
  width: 390px;
  height: 61px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${(props) => props.theme.snBlue};
  .formInput::placeholder {
    color: ${(props) => props.theme.snGreyOff};
  }
  .block {
    display: block;
    border: 1px solid blue;
  }
  .formInput + * {
    color: ${({ message }) => (message ? "red" : "")};
  }
`;

export default function CommentInput({ left, right }) {
  const [message, setMessage] = useState("");

  // message가 true일때
  // right의 color 바꾸기
  return (
    <form>
      <FormLabel message={message}>
        {left}
        <input
          id="inputID"
          type="text"
          className="formInput"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {right}
      </FormLabel>
    </form>
  );
}

CommentInput.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
};
