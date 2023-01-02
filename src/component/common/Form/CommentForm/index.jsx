import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 15px;

  height: 61px;

  color: ${({ theme }) => theme.snGreyOff};
  background-color: ${({ theme }) => theme.snWhite};

  box-shadow: rgba(17, 12, 46, 0.08) 0px -5px 100px 0px;
  z-index: 100;

  .label-comment {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;

    + button {
      color: ${({ $isFilled, theme }) =>
        $isFilled ? theme.snBlue : theme.snGreyMain};
      ${({ $isFilled }) => !$isFilled && `pointer-events: none;`}
    }
  }
  .formInput {
    flex: 1;
    height: 30px;
    padding: 0 7px;
    border: 1px solid ${({ theme }) => theme.snGreyOff};
    border-radius: 10px;

    :focus {
      outline-color: ${({ theme }) => theme.snBlue};
    }
  }
`;

export default function CommentForm({
  left,
  right,
  placeholder = "Type a message",
  ...props
}) {
  const [isFilled, setIsFilled] = useState(false);

  const setIsFilledIfHasContent = (event) => {
    const {
      target: { value },
    } = event;
    if (isFilled && !value) {
      setIsFilled(false);
    }
    if (!isFilled && value) {
      setIsFilled(true);
    }
  };

  return (
    <Form $isFilled={isFilled} {...props}>
      <label className="label-comment">
        {left}
        <input
          type="text"
          className="formInput"
          name="inpComment"
          placeholder={placeholder}
          onKeyUp={setIsFilledIfHasContent}
        />
      </label>
      {right}
    </Form>
  );
}

CommentForm.propTypes = {
  left: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
  placeholder: PropTypes.string,
};
