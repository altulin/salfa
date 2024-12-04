import clsx from "clsx";
import style from "./Footer.module.scss";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className={clsx(style.footer)}>
      <div className={clsx(style.footer__inner)}></div>
    </footer>
  );
};

export default Footer;
