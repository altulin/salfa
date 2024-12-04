import SvgSprite from "@/hoc/Svg";
import { FC } from "react";
import IconLike from "@/images/sprite/like.svg";
import clsx from "clsx";
import style from "./Products.module.scss";
import { useAppDispatch } from "@/hooks/hook";
import { setLikes } from "@/store/card/cardSlice";

const Like: FC<{ id: number; like?: boolean }> = ({ id, like }) => {
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setLikes(id));
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={clsx(style.like, style.btn, like && style.like__active)}
    >
      <SvgSprite icon={IconLike} />
    </button>
  );
};
export default Like;
