import styled from "styled-components";
import PropTypes from "prop-types";

const SingleImg = styled.img`
  width: 300px;
  height: 400px;
  margin-bottom: 30px;
  border: 3px solid ${({ theme }) => theme.snBlack};
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0);
`;

const ProductItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 30px;
`;

const ProductItemList = styled.div`
  margin: 0 auto;
  width: 700px;
  flex-grow: 1;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar:hover::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .productName {
    font-size: larger;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .productPrice {
    font-size: larger;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

const StyleButton = styled.button`
  background-color: ${({ theme }) => theme.snWhite};
  margin-top: 10px;
  width: 100px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.snBlack};
`;

function ProductList({ productData }) {
  return (
    <ProductItemList className="scrollhost">
      {productData.map((slide) => {
        return (
          <ProductItem key={slide.id}>
            <SingleImg src={slide.itemImage} alt="" />
            <p className="productName">Product Name: {slide.itemName}</p>
            <p className="productPrice">Price: {slide.price}</p>
            <StyleButton type="button">checkout</StyleButton>
          </ProductItem>
        );
      })}
    </ProductItemList>
  );
}

export default ProductList;

ProductList.propTypes = {
  productData: PropTypes.arrayOf(PropTypes.object),
};
