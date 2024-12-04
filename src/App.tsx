import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Template from "@/templates_pages/Template";

import ModalManager from "@/components/modal/ModalManager";
import { HelmetProvider } from "react-helmet-async";
import Seo from "@/hoc/seo/Seo";
import Products from "@/components/products/Products";
import { paths } from "@/paths";
import ProductCard from "@/components/productCard/ProductCard";
import Create from "@/components/create/create";

const App: FC = () => {
  const title = import.meta.env.VITE_APP_TITLE;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const url = import.meta.env.VITE_APP_URL;

  return (
    <HelmetProvider>
      {import.meta.env.PROD && (
        <Seo title={title} description={description} url={url} />
      )}

      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Products />} />
          <Route path={`/${paths.create}`} element={<Create />} />
        </Route>

        <Route path={`/${paths.products}`} element={<Template />}>
          <Route index element={<Products />} />
          <Route path={`:id`} element={<ProductCard />} />
        </Route>

        <Route path="*" element={<Products />} />
      </Routes>
      <ModalManager />
    </HelmetProvider>
  );
};

export default App;
