import Pagination, { PaginationProps } from "rc-pagination";
import style from "./Products.module.scss";
import { FC, useEffect } from "react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setArrayPagination, setPage } from "@/store/card/cardSlice";
import { pageSize } from "@/paths";

const PaginationComponent: FC<PaginationProps> = ({ ...props }) => {
  const { arrayTotalFiltered, page } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const array = arrayTotalFiltered.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );
    dispatch(setArrayPagination(array));
  }, [arrayTotalFiltered, dispatch, page]);

  if (arrayTotalFiltered?.length < pageSize) return null;

  return (
    <Pagination
      className={clsx(style.pagination)}
      {...props}
      showSizeChanger={false}
      showPrevNextJumpers={false}
      total={arrayTotalFiltered?.length}
      pageSize={pageSize}
      onChange={(p) => dispatch(setPage(p))}
      current={page}
    />
  );
};
export default PaginationComponent;
