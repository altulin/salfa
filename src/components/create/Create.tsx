/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import style from "./Create.module.scss";
import { FC, useEffect } from "react";
import Title from "@/UI/title/Title";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateSchema } from "@/UI/form_hook/utils/validation/yupSchemaCreator";
import Field from "@/UI/form_hook/hoc/Field";
import { formData } from "./data";
import { Link, useNavigate } from "react-router-dom";
import { empty, filterPath, paths } from "@/paths";
import { useAppDispatch } from "@/hooks/hook";
import { setFilter, setPage } from "@/store/card/cardSlice";
import { ICard } from "@/types";
import { IProp } from "./types";

const Create: FC<IProp> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ...methods } = useForm({
    resolver: yupResolver(validateSchema(formData)),
    mode: "onChange",
    defaultValues: props.defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const onSubmit = (data: any) => {
    const newData: ICard = {
      ...data,
      id: randomNumberInRange(100, 200),
      thumbnail: empty,
      like: false,
    };
    props.fn(newData);
    dispatch(setFilter(filterPath.all));
    dispatch(setPage(1));
    navigate(`/${paths.products}`);
  };

  useEffect(() => reset(props.defaultValues), [props.defaultValues, reset]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className={clsx(style.create)}>
      <div className={clsx(style.create__inner, "container")}>
        <Title label={props.title} />

        <FormProvider {...methods}>
          <form
            className={clsx(style.create__form)}
            action="#"
            id="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={clsx(style.create__block)}>
              {formData.map((item, i) => (
                <Field key={i} {...item} />
              ))}
            </div>

            <div className={clsx(style.create__control)}>
              <Link
                type="button"
                className={clsx(style.create__button)}
                to={`/${paths.products}`}
              >
                Назад
              </Link>

              <button className={clsx(style.create__button)} type="submit">
                {props.btnLabel}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Create;
