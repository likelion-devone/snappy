import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Label = styled.label`
  margin: 0 auto;
  height: 61px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  color: ${(props) => props.theme.snGreyOff};
  input {
    width: 70%;
    line-height: 200%;
    border: 1px solid ${(props) => props.theme.snGreyOff};
  }
  input:focus {
    outline-color: #33afd8;
  }
  .formInput + * {
    color: ${({ message }) => (message ? (props) => props.theme.snBlue : "")};
  }
`;

export default function CommentInput({ left, right, className }) {
  const [message, setMessage] = useState("");

  return (
    <form className={className}>
      <Label message={message}>
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
      </Label>
    </form>
  );
}

CommentInput.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  className: PropTypes.string,
};
