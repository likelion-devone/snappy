import { Outlet } from "react-router-dom";
import ProductProvider from "component/Product/ProductProvider";

export default function ProductPage() {
  return (
    <ProductProvider>
      <Outlet />
    </ProductProvider>
  );
}
