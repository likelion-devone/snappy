import { createContext } from "react";
import PropTypes from "prop-types";
import LabeledInput from "component/common/Input/LabeledInput";
import { ErrorMessageForValidationInput } from "component/common/Input/ValidationInput/ErrorMessage";

export const ValidationInputContext = createContext();

export default function ValidationInputWrapper({ children, errorMessage }) {
  return (
    <ValidationInputContext.Provider value={{ errorMessage }}>
      {children}
    </ValidationInputContext.Provider>
  );
}

ValidationInputWrapper.Input = LabeledInput;
ValidationInputWrapper.ErrorMessage = ErrorMessageForValidationInput;

ValidationInputWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
