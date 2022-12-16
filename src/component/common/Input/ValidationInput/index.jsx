import { createContext } from "react";
import PropTypes from "prop-types";
import AuthInput from "component/common/Input/AuthInput";
import ErrorMessage from "component/common/Input/ValidationInput/ErrorMessage";

export const ValidationInputContext = createContext();

export default function ValidationInputWrapper({ children, errorMessage }) {
  return (
    <ValidationInputContext.Provider value={{ errorMessage }}>
      {children}
    </ValidationInputContext.Provider>
  );
}

ValidationInputWrapper.Input = AuthInput;
ValidationInputWrapper.ErrorMessage = ErrorMessage;

ValidationInputWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
