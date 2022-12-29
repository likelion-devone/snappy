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

// const initialProductData = {
//   itemName: "",
//   price: 0,
//   link: "",
//   itemImage: "",
// };

export default function ProductProvider({ children }) {
  const [productData, dispatchProductData] = useReducer(productReducer, null);

  const [isFormFilled, setIsFormFilled] = useState(false);

  // const [itemName, setItemName] = useState();
  // const [price, setPrice] = useState();
  // const [link, setLink] = useState();
  // const [itemImage, setItemImage] = useState();

  // const value = {
  //   state: { product: { itemName, price, link, itemImage } },
  //   actions: { setItemName, setPrice, setLink, setItemImage },
  // };
  return (
    <ProductContext.Provider
      value={{
        productData,
        dispatchProductData,
        isFormFilled,
        setIsFormFilled,
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
