import clsx from "clsx";
import { FC } from "react";
import style from "./Products.module.scss";
import { ICard } from "@/types";
import Del from "./Del";
import { Link } from "react-router-dom";
import { paths } from "@/paths";
import img from "@/images/img.png";
import LazyLoad from "react-lazyload";
import Like from "./Like";

const Card: FC<ICard> = ({ ...props }) => {
  const { title, images, description, price, id, like } = props;

  return (
    <div className={clsx(style.card)}>
      <Link className={clsx(style.card__link)} to={`/${paths.products}/${id}`}>
        <Del id={id} />
        <Like id={id} like={like} />

        <figure className={clsx(style.card__image)}>
          <LazyLoad once>
            <img src={images[0] || img} alt={title} />
          </LazyLoad>
        </figure>

        <div className={clsx(style.card__content)}>
          <h3 className={clsx(style.card__title)}>{title}</h3>

          <div className={clsx(style.description)}>
            <p className={clsx(style.description__text)}>{description}</p>
          </div>

          <div className={clsx(style.price)}>
            <p className={clsx(style.price__label)}>Цена</p>
            <p className={clsx(style.price__value)}>{`${price} руб`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Card;
