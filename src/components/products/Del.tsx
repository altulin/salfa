import SvgSprite from "@/hoc/Svg";
import { FC } from "react";
import IconDel from "@/images/sprite/delete.svg";
import clsx from "clsx";
import style from "./Products.module.scss";
import { setDelete, setPage } from "@/store/card/cardSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { pageSize } from "@/paths";

const Del: FC<{ id: number }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { arrayTotalFiltered, page } = useAppSelector((state) => state.card);
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (arrayTotalFiltered.length % pageSize === 1) {
      dispatch(setPage(page - 1));
    }

    dispatch(setDelete(id.toString()));
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={clsx(style.del, style.btn)}
    >
      <SvgSprite icon={IconDel} />
    </button>
  );
};
export default Del;
