import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const IsUploadPossible = createContext();

function IsUploadPossibleProvider({ children }) {
  const [possibleUpload, setPossibleUpload] = useState(false);

  return (
    <IsUploadPossible.Provider value={{ possibleUpload, setPossibleUpload }}>
      {children}
    </IsUploadPossible.Provider>
  );
}

IsUploadPossibleProvider.propTypes = {
  children: PropTypes.node,
};

export default IsUploadPossibleProvider;
