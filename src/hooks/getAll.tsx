import { useGetProductsQuery } from "@/store/rtk/products/api";
import { useAppSelector } from "./hook";
import { ICard } from "@/types";

const useGetArray = () => {
  const { data, isSuccess } = useGetProductsQuery({});
  const { deletes, likes, arrayCreated } = useAppSelector(
    (state) => state.card,
  );

  let arr: ICard[] = [];

  if (isSuccess) {
    arr = [...data.products, ...arrayCreated]
      .filter((item) => !deletes.includes(item.id))
      .map((item) => {
        return { ...item, like: likes.includes(item.id) };
      });
  }

  return { filteredList: arr };
};

export default useGetArray;
