import { Input as AntdInput, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type Props = { name: string } & Pick<InputProps, "size" | "placeholder">;

const Input = ({ name, size = "large", placeholder }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AntdInput size={size} placeholder={placeholder} {...field} />
      )}
    />
  );
};

export default Input;
