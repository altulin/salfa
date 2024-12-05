import { ICard } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProp {
  title: string;
  defaultValues: any;
  btnLabel: string;
  fn: (newData: ICard) => void;
}
