import clsx from "clsx";
import style from "./Title.module.scss";
import { FC } from "react";

const Title: FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <h2 className={clsx(style.title)}>
      <span className={clsx(style.title__label)}>{label}</span>
      {children}
    </h2>
  );
};

export default Title;
