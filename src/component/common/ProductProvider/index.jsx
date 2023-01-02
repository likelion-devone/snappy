import { createContext, useState, useReducer } from "react";
import PropTypes from "prop-types";

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw Error("Product Reducer 오류");
  }
};

export default function ProductProvider({ children }) {
  const [productData, dispatchProductData] = useReducer(productReducer, null);

  const [isFormFilled, setIsFormFilled] = useState(false);
  // TODO: IsUploadPossibleProvider랑 합치기

  const [selectedProductData, setSelectedProductData] = useState(null);

  return (
    <ProductContext.Provider
      value={{
        productData,
        dispatchProductData,
        isFormFilled,
        setIsFormFilled,
        selectedProductData,
        setSelectedProductData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProductContext };
