import styled from "styled-components";
import PropTypes from "prop-types";

const SingleImg = styled.img`
  width: 300px;
  height: 400px;
  margin-bottom: 30px;
  border: 3px solid ${({ theme }) => theme.snBlack};
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0);

  object-fit: cover;
`;

const ProductItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  margin: 30px;
`;

const ProductItemList = styled.ul`
  margin: 0 auto;
  width: 100%;

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

const StyledLink = styled.a`
  background-color: ${({ theme }) => theme.snWhite};
  margin-top: 10px;
  width: 100px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.snBlack};

  text-align: center;

  line-height: 50px;
`;

function ProductList({ productData }) {
  return (
    <ProductItemList className="scrollhost">
      {productData.map((slide) => {
        return (
          <ProductItem key={slide.id}>
            <SingleImg src={slide.itemImage.split(',')[0]} alt={`${slide.itemName}의 사진입니다.`} />
            <p className="productName">Product Name: {slide.itemName}</p>
            <p className="productPrice">Price: {slide.price}</p>
            <StyledLink href={slide.link} target="_blank">checkout</StyledLink>
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
