import clsx from "clsx";
import { FC, RefObject, useState } from "react";
import style from "./Products.module.scss";
import SvgSprite from "@/hoc/Svg";
import IconFilter from "@/images/sprite/filter-svgrepo-com.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setArrayCard, setFilter } from "@/store/card/cardSlice";
import { useClickAway } from "@uidotdev/usehooks";
import { filterPath } from "@/paths";
import { useGetProductsQuery } from "@/store/rtk/products/api";

const Drop: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isSuccess } = useGetProductsQuery({});

  const dispatch = useAppDispatch();
  const { arrayCard, filter, deletes, likes, addArrayCard } = useAppSelector(
    (state) => state.card,
  );

  const date_btn = [
    {
      label: "Все",
      value: filterPath.all,
      handle: () => {
        if (!isSuccess) return;
        const array = [...data.products, ...addArrayCard]
          .filter((item) => !deletes.includes(item.id))
          .map((item) => {
            return { ...item, like: likes.includes(item.id) };
          });

        dispatch(setArrayCard(array));
      },
    },
    {
      label: "Избранное",
      value: filterPath.like,
      handle: () => {
        dispatch(setArrayCard(arrayCard.filter((item) => item.like)));
      },
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  return (
    <div className={clsx(style.drop)} ref={ref as RefObject<HTMLDivElement>}>
      <button
        className={clsx(style.drop__open)}
        onClick={() => setIsOpen(true)}
      >
        <span className={clsx(style.drop__icon)}>
          <SvgSprite icon={IconFilter} />
        </span>

        <span className={clsx(style.drop__text)}>
          {date_btn.find((item) => item.value === filter)?.label}
        </span>
      </button>

      {isOpen && (
        <div className={clsx(style.drop__content)}>
          {date_btn.map((item, i) => {
            return (
              <button
                key={i}
                className={clsx(style.drop__btn)}
                onClick={() => {
                  handleClose();
                  item.handle();
                  dispatch(setFilter(item.value));
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Drop;
