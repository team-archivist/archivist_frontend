import { Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type Props = { name: string } & Pick<InputProps, "size" | "placeholder">;

const ACInput = ({ name, size = "large", placeholder }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input size={size} placeholder={placeholder} {...field} />
      )}
    />
  );
};

export default ACInput;
