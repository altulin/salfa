import clsx from "clsx";
import { FC } from "react";
import style from "./Header.module.scss";

const Header: FC = () => {
  return (
    <header className={clsx(style.header)}>
      <div className={clsx(style.header__inner)}></div>
    </header>
  );
};
export default Header;
