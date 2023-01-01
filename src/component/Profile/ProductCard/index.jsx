import styled from "styled-components";
import PropTypes from "prop-types";
import { FONT_SIZE } from "constant/style";
import { useContext } from "react";
import { ProductContext } from "component/common/ProductProvider/index";

const ProductItem = styled.li`
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
  background-color: ${({ theme }) => theme.snWhite};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-bottom: 10px;
  cursor: pointer;

  .product-name {
    font-size: ${FONT_SIZE.X_LARGE};
    font-weight: 600;
  }
  .product-price {
    font-size: ${FONT_SIZE.LARGE};
    font-weight: 500;
    letter-spacing: 0.5px;
  }
  @media only screen and (max-width: 500px) {
    gap: 12px;

    .product-name {
      font-size: ${FONT_SIZE.LARGE};
    }
    .product-price {
      font-size: ${FONT_SIZE.BASE};
      letter-spacing: 0.5px;
    }
  }

  transition: all 0.2s;
  :hover {
    transform: scale(1.03);
  }
`;

const SingleImg = styled.img`
  width: 200px;
  height: 250px;
  @media only screen and (max-width: 500px) {
    width: 100px;
    height: 110px;
  }
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  object-fit: cover;
`;

export default function ProductCard({ singleProductData, dropUpProductModal }) {
  const { setSelectedProductData } = useContext(ProductContext);

  function handleProductItem() {
    setSelectedProductData(singleProductData);
    dropUpProductModal();
  }

  return (
    <>
      <ProductItem onClick={handleProductItem}>
        <SingleImg
          src={singleProductData.itemImage.split(",")[0]}
          alt={`${singleProductData.itemName}의 사진입니다.`}
        />
        <p className="product-name">{singleProductData.itemName}</p>
        <p className="product-price">
          {new Intl.NumberFormat().format(singleProductData.price)}원
        </p>
      </ProductItem>
    </>
  );
}

ProductCard.propTypes = {
  singleProductData: PropTypes.object.isRequired,
  dropUpProductModal: PropTypes.func,
};
