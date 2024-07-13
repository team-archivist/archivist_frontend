import { Input as AntdInput, InputProps } from "antd";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props = {
  maxLength?: number;
  name: string;
  inputClassName?: string;
} & Pick<InputProps, "size" | "placeholder"> &
  Partial<ControllerProps>;

const Input = ({
  name,
  size = "large",
  placeholder,
  inputClassName,
  maxLength,
  ...props
}: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      {...props}
      name={name}
      control={control}
      render={({ field }) => (
        <AntdInput
          maxLength={maxLength}
          size={size}
          placeholder={placeholder}
          className={twMerge("", inputClassName)}
          {...field}
        />
      )}
    />
  );
};

export default Input;
