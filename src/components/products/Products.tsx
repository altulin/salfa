import clsx from "clsx";
import style from "./Products.module.scss";
import { FC, useEffect } from "react";
import Title from "@/UI/title/Title";
import { useGetProductsQuery } from "@/store/rtk/products/api";
import Card from "./Card";
import { ICard } from "@/types";
import Drop from "./Drop";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setArrayCard } from "@/store/card/cardSlice";
import { checkArr } from "@/service/checkArr";
import { filterPath, paths } from "@/paths";
import { Link } from "react-router-dom";

const Products: FC = () => {
  const { data, isSuccess } = useGetProductsQuery({});
  const dispatch = useAppDispatch();
  const { arrayCard, deletes, likes, filter } = useAppSelector(
    (state) => state.card,
  );

  useEffect(() => {
    if (!isSuccess) return;
    if (!data?.products) return;
    dispatch(setArrayCard([...data.products]));
  }, [data?.products, dispatch, isSuccess]);

  useEffect(() => {
    dispatch(
      setArrayCard(arrayCard.filter((item) => !deletes.includes(item.id))),
    );
  }, [deletes, dispatch]);

  useEffect(() => {
    dispatch(
      setArrayCard(
        arrayCard.map((item) => {
          return { ...item, like: likes.includes(item.id) };
        }),
      ),
    );

    if (filter === filterPath.like) {
      dispatch(
        setArrayCard(arrayCard.filter((item) => likes.includes(item.id))),
      );
    }
  }, [likes, dispatch]);

  return (
    <section className={clsx(style.products)}>
      <div className={clsx(style.products__inner, "container")}>
        <Title label={"список продуктов"}>
          <Drop />
        </Title>

        <div className={clsx(style.content)}>
          {checkArr(arrayCard) &&
            arrayCard.map((item: ICard) => {
              return <Card key={item.id} {...item} />;
            })}
        </div>

        <div className={clsx(style.create)}>
          <Link to={`/${paths.create}`} className={clsx(style.create__btn)}>
            Создать продукт
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;