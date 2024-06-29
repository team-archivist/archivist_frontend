import { Input as AntdInput, InputProps } from "antd";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type Props = { name: string; inputClassName?: string } & Pick<
  InputProps,
  "size" | "placeholder"
> &
  Partial<ControllerProps>;

const Input = ({
  name,
  size = "large",
  placeholder,
  inputClassName,
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
