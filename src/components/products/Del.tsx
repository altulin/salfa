import SvgSprite from "@/hoc/Svg";
import { FC } from "react";
import IconDel from "@/images/sprite/delete.svg";
import clsx from "clsx";
import style from "./Products.module.scss";
import { setDelete } from "@/store/card/cardSlice";
// import { api } from "@/store/service/api";
import { useAppDispatch } from "@/hooks/hook";
// import { Draft } from "@reduxjs/toolkit";
// import store from "@/store";

const Del: FC<{ id: number }> = ({ id }) => {
  const dispatch = useAppDispatch();

  // const { arrayCard, addArrayCard } = useAppSelector((state) => state.card);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // dispatch(setArrayCard([...arrayCard, ...addArrayCard]));

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
