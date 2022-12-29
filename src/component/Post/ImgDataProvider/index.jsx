import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ImgData = createContext();

function ImgDataProvider({ children }) {
  const [imgBlob, setImgBlob] = useState([]);

  return (
    <ImgData.Provider value={{ imgBlob, setImgBlob }}>
      {children}
    </ImgData.Provider>
  );
}

ImgDataProvider.propTypes = {
  children: PropTypes.node,
};

export default ImgDataProvider;
