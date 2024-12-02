import { FC, InputHTMLAttributes } from "react";
import { Reference } from "yup";

export enum EnumTextInput {
  label_text = "label_text",
  name = "name",
  id = "id",
  placeholder = "placeholder",
  label = "label",
  value = "value",
  modifier = "modifier",
}

export type TParams = (
  | string
  | number
  | RegExp
  | Reference<unknown>[]
  | boolean[]
  | object
)[];

export interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
  label_text?: string;
  modifier?: string | null | undefined;
  validations?: { type: string; params: TParams }[];
  validation_type?: string;
  options?: OptionsType;
  radio_list?: TRadioItem[];
  minRows?: number;
  init_value?: string | number | boolean | { label: string; value: string };
  component?: FC<ITextInput>;
  name: string;
}

type TRadioItem = {
  label: string;
  value: string;
};

export type OptionsType = { [key: string]: string | number }[];
