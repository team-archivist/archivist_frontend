import Input from "@arcave/components/common/Input";
import { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  component: Input,
  args: {},
  render: (args) => {
    const methods = useForm({
      defaultValues: {
        name: "",
      },
    });

    return (
      <FormProvider {...methods}>
        <Input {...args} name="name" />
      </FormProvider>
    );
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
