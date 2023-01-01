import { Outlet } from "react-router-dom";
import ProductProvider from "component/common/ProductProvider/index";

export default function ProductPage() {
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  );
}
