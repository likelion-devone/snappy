import { useState, createContext } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} IsUploadPossibleContextObject
 * @property {boolean} isPossibleToUpload
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsPossibleToUpload
 */

/**
 * @type {React.Context<IsUploadPossibleContextObject>}
 */
export const IsUploadPossibleContext = createContext();

function IsUploadPossibleProvider({ children }) {
  const [isPossibleToUpload, setIsPossibleToUpload] = useState(false);

  return (
    <IsUploadPossibleContext.Provider value={{ isPossibleToUpload, setIsPossibleToUpload }}>
      {children}
    </IsUploadPossibleContext.Provider>
  );
}

IsUploadPossibleProvider.propTypes = {
  children: PropTypes.node,
};

export default IsUploadPossibleProvider;
