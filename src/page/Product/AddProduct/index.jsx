import { useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ProductContext } from "component/Product/ProductProvider";
import ProductForm from "component/Product/Form/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";

import useAPI from "hook/useAPI";
import useTopNavSetter from "hook/useTopNavSetter";

import { req } from "lib/api/index";
import routeResolver from "util/routeResolver";

import ROUTE from "constant/route";

export default function AddProductPage() {
  const navigate = useNavigate();
  const { isFormFilled, productData } = useContext(ProductContext);
  const [isProductAdding, addProductResult, addProductError, addProduct] =
    useAPI(req.product.add);

  const UploadButton = useMemo(
    () => (
      <TopNavElement.Button form="productForm" $isAbled={isFormFilled || isProductAdding}>
        저장
      </TopNavElement.Button>
    ),
    [isFormFilled, isProductAdding]
  );

  const { setTopNavRight } = useTopNavSetter({
    title: "상품 등록 페이지",
    left: <TopNavElement.GoBackButton />,
    right: UploadButton,
  });

  useEffect(() => {
    setTopNavRight(UploadButton);
  }, [setTopNavRight, UploadButton]);

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

  return <ProductForm formId="productForm" />;
}
