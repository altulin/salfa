import { FC, useCallback, useMemo } from "react";
import Create from "./Create";
import { useLocation } from "react-router-dom";
import { IProp } from "./types";
import { makeInitialValues } from "@/UI/form_hook/utils/initialValues";
import { formData } from "./data";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { checkArr } from "@/service/checkArr";
import { setArrayCreated, setTotalFiltered } from "@/store/card/cardSlice";
import { ICard } from "@/types";

const CreateHoc: FC = () => {
  const location = useLocation();
  const { arrayTotalFiltered } = useAppSelector((state) => state.card);
  const dispatch = useAppDispatch();

  const defaultEdit = useCallback(() => {
    const currentId = location.state.id;
    if (!currentId) return {};
    if (!checkArr(arrayTotalFiltered)) return {};
    const elem = arrayTotalFiltered.filter(
      (item) => item.id === Number(currentId),
    )[0];
    const fields = formData.map((item) => item.name);
    return fields.reduce((acc, item) => {
      return {
        ...acc,
        [item]: elem[item],
      };
    }, {});
  }, [arrayTotalFiltered, location.state.id]);

  const data: Record<string, IProp> = useMemo(() => {
    return {
      edit: {
        title: "Изменение продукта",
        defaultValues: defaultEdit(),
        btnLabel: "Изменить",
        fn: (newData: ICard) => {
          const editEl: ICard = { ...newData, id: Number(location.state.id) };
          const newArr = arrayTotalFiltered.reduce((acc, item) => {
            if (item.id === editEl.id) return [...acc, editEl];
            return [...acc, item];
          }, []);

          dispatch(setTotalFiltered(newArr));
          return;
        },
      },

      create: {
        title: "Создание продукта",
        defaultValues: makeInitialValues(formData),
        btnLabel: "Создать",
        fn: (newData: ICard) => dispatch(setArrayCreated(newData)),
      },
    };
  }, [defaultEdit]);

  if (!location.state.value) return null;

  return <Create {...data[`${location.state.value}`]} />;
};

export default CreateHoc;
