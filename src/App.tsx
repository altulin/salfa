import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Template from "@/templates_pages/Template";

import ModalManager from "@/components/modal/ModalManager";
import { HelmetProvider } from "react-helmet-async";
import Seo from "@/hoc/seo/Seo";
import Products from "@/components/products/Products";
import { paths } from "@/paths";
import ProductCard from "@/components/productCard/ProductCard";
import useGetArray from "./hooks/getAll";
import { useAppDispatch } from "./hooks/hook";
import { setTotalFiltered } from "./store/card/cardSlice";
import useDeepCompareEffect from "use-deep-compare-effect";
import CreateHoc from "./components/create/CreateHoc";

const App: FC = () => {
  const title = import.meta.env.VITE_APP_TITLE;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const url = import.meta.env.VITE_APP_URL;
  const { filteredList } = useGetArray();
  const dispatch = useAppDispatch();

  useDeepCompareEffect(() => {
    dispatch(setTotalFiltered(filteredList));
  }, [dispatch, filteredList]);

  return (
    <HelmetProvider>
      {import.meta.env.PROD && (
        <Seo title={title} description={description} url={url} />
      )}

      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Products />} />
          <Route path={`/${paths.create}`} element={<CreateHoc />} />
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
