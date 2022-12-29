import ProductForm from "component/Product/Form/index";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useAPI from "hook/useAPI";
import { req } from "lib/api/index";
import { ProductContext } from "component/Product/ProductProvider";

import ROUTE from "constant/route";
import routeResolver from "util/routeResolver";

export default function AddProductPage() {
  const navigate = useNavigate();
  const { isFormFilled, productData } = useContext(ProductContext);
  const [isProductAdding, addProductResult, addProductError, addProduct] =
    useAPI(req.product.add);

  useEffect(() => {
    if (!productData) {
      return;
    }

    addProduct(productData);
  }, [addProduct, productData]);

  useEffect(() => {
    if (addProductResult) {
      alert("상품 등록이 완료되었스내피!");
      navigate(
        routeResolver(
          ROUTE.PROFILE,
          addProductResult.product.author.accountname
        )
      );
      return;
    }
    if (addProductError) {
      alert("상품 등록에 실패했스내피. 오류가 접수되었습니다.");
    }
  }, [addProductResult, addProductError, navigate]);

  return (
    <>
      <button
        type="submit"
        form="productForm"
        disabled={!isFormFilled || isProductAdding}
      >
        제출하기
      </button>
      <ProductForm formId="productForm" />
    </>
  );
}
