import { Input, InputProps } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type Props = { name: string } & Pick<InputProps, "size" | "placeholder">;

const TextArea = ({ name, size = "large", placeholder }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input.TextArea
          size={size}
          placeholder={placeholder}
          autoSize={{ minRows: 3, maxRows: 10 }}
          {...field}
        />
      )}
    />
  );
};

export default TextArea;
