/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetArray from "@/hooks/getAll";
import { useAppDispatch } from "@/hooks/hook";
import { checkArr } from "@/service/checkArr";
import { setTotalFiltered } from "@/store/card/cardSlice";
import Field from "@/UI/form_hook/hoc/Field";
import { ITextInput } from "@/UI/form_hook/utils/types";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { ...methods } = useForm({
    mode: "onChange",
    defaultValues: { search: "" },
  });
  const { filteredList } = useGetArray();

  const field: ITextInput = {
    name: "search",
    placeholder: "Введите название",
    onInput: (e) => {
      const value = (e.target as any).value;

      if (value.length === 0) {
        dispatch(setTotalFiltered(filteredList));
        return;
      }

      const searchList = filteredList.filter((item) => {
        const words = item.title.split(" ");
        return checkArr(
          words.filter((el) => {
            return el.toLowerCase().startsWith(value.toLowerCase());
          }),
        );
      });

      dispatch(setTotalFiltered(searchList));
    },
  };

  return (
    <FormProvider {...methods}>
      <Field {...field} />
    </FormProvider>
  );
};
export default Search;
