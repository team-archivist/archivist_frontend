import MyPage from "@arcave/components/views/MyPage";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof MyPage>;

const meta: Meta<typeof MyPage> = {
  component: MyPage,
  args: {},
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
