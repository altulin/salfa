import clsx from "clsx";
import style from "./ProductCard.module.scss";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { changes, paths } from "@/paths";
import { checkArr } from "@/service/checkArr";
import img from "@/images/img.png";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/hook";

const ProductCard: FC = () => {
  const { id } = useParams();

  const { arrayTotalFiltered } = useAppSelector((state) => state.card);

  const getData = () => {
    const item =
      [...arrayTotalFiltered].filter((item) => item.id === Number(id)) || [];

    return checkArr(item) ? item[0] : null;
  };

  const item = getData();

  return (
    <section className={clsx(style.productCard)}>
      <div className={clsx(style.productCard__inner, "container")}>
        <div className={clsx(style.left)}>
          <figure className={clsx(style.left__image)}>
            {item && (
              <LazyLoad>
                <img src={item.thumbnail || img} alt={item.title} />
              </LazyLoad>
            )}
          </figure>
        </div>
        <div className={clsx(style.right)}>
          {item && <h2 className={clsx(style.right__title)}>{item.title}</h2>}
          {item && (
            <p className={clsx(style.right__description)}>{item.description}</p>
          )}

          {item && <div className={clsx(style.right__brand)}>{item.brand}</div>}

          {item && (
            <div className={clsx(style.price)}>
              <p className={clsx(style.price__label)}>Цена</p>
              <p className={clsx(style.price__value)}>{`${item.price} руб`}</p>
            </div>
          )}

          <div className={clsx(style.control)}>
            <Link
              type="button"
              className={clsx(style.left__btn)}
              to={`/${paths.products}`}
            >
              назад
            </Link>

            <Link
              type="button"
              className={clsx(style.left__btn)}
              to={`/${paths.create}`}
              state={{ value: changes.edit, id }}
            >
              изменить
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
