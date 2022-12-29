import ProductForm from "component/Product/Form/index";
import { useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAPI from "hook/useAPI";
import { req } from "lib/api/index";
import { ProductContext } from "component/Product/ProductProvider";

import ROUTE from "constant/route";
import useFetch from "hook/useFetch";
import routeResolver from "util/routeResolver";

export default function EditProductPage() {
  const { productid } = useParams();
  const navigate = useNavigate();

  const isMounted = useRef(false);

  const [isProductDataFetching, initialProductData, initialProductDataError] =
    useFetch(req.product.detail, { productId: productid });

  const { isFormFilled, productData, dispatchProductData } =
    useContext(ProductContext);

  const [isProductEditing, editProductResult, editProductError, editProduct] =
    useAPI(req.product.edit);

  useEffect(() => {
    if (initialProductDataError) {
      alert("물건 데이터 fetch 오류");
      navigate(ROUTE.HOME);
      return;
    }
    if (initialProductData) {
      dispatchProductData({
        type: "set",
        payload: {
          itemName: initialProductData.product.itemName,
          price: initialProductData.product.price,
          link: initialProductData.product.link,
          itemImage: initialProductData.product.itemImage,
        },
      });
    }
  }, [
    initialProductData,
    initialProductDataError,
    navigate,
    dispatchProductData,
  ]);

  useEffect(() => {
    if (!productData) {
      return;
    }

    if (
      !Object.keys(productData).every(
        (key) => productData[key] === initialProductData.product[key]
      )
    ) {
      editProduct({ productId: productid, ...productData });
    } else if (isMounted.current) {
      alert("수정사항이 없습니다.")
    } else {
      isMounted.current = true;
    }
  }, [
    editProduct,
    productData,
    initialProductData,
    productid,
    isMounted,
    navigate,
  ]);

  useEffect(() => {
    if (editProductResult) {
      alert("상품 내용을 수정했스내피!");
      navigate(
        routeResolver(
          ROUTE.PROFILE,
          initialProductData.product.author.accountname
        )
      );
      return;
    }
    if (editProductError) {
      alert("수정하다가 에러뜸");
    }
  }, [editProductResult, editProductError, navigate, initialProductData]);

  return isProductDataFetching ? (
    <>로딩중</>
  ) : (
    <>
      <button
        type="submit"
        form="productForm"
        disabled={!isFormFilled || isProductEditing}
      >
        제출하기
      </button>
      <ProductForm
        formId="productForm"
        initialProductData={initialProductData}
      />
    </>
  );
}
