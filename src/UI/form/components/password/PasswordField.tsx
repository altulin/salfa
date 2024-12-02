import { FC, useState } from "react";
import TextInput from "../TextInput";
import ButtonEye from "./ButtonEye";
import { ITextInput } from "../../types";

const PasswordField: FC<ITextInput> = ({ ...props }) => {
  const [isTypeText, setType] = useState(false);

  return (
    <TextInput {...props} type={isTypeText ? "text" : "password"}>
      <ButtonEye isTypeText={isTypeText} setType={setType} />
    </TextInput>
  );
};
export default PasswordField;
