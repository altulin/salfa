import clsx from "clsx";
import style from "./Create.module.scss";
import { FC, useEffect } from "react";
import Title from "@/UI/title/Title";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateSchema } from "@/UI/form_hook/utils/validation/yupSchemaCreator";
import { makeInitialValues } from "@/UI/form_hook/utils/initialValues";
import Field from "@/UI/form_hook/hoc/Field";
import { formData } from "./data";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/paths";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { setAddArrCard, setArrayCard } from "@/store/card/cardSlice";
import { ICard } from "@/types";

const Create: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { arrayCard, addArrayCard } = useAppSelector((state) => state.card);

  const { ...methods } = useForm({
    resolver: yupResolver(validateSchema(formData)),
    mode: "onChange",
    defaultValues: makeInitialValues(formData),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const randomNumberInRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const onSubmit = (data: ICard) => {
    const newData = {
      ...data,
      id: randomNumberInRange(100, 200),
      images: [],
      like: false,
    };

    dispatch(setAddArrCard(newData));
    dispatch(
      setArrayCard(
        Array.from(new Set([...arrayCard, ...addArrayCard, newData])),
      ),
    );
    navigate(`/${paths.products}`);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className={clsx(style.create)}>
      <div className={clsx(style.create__inner, "container")}>
        <Title label="Создание продукта" />

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
                Создать
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Create;
