import TitleContainer from "@arcave/components/common/TitleContainer";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof TitleContainer>;

const meta: Meta<typeof TitleContainer> = {
  component: TitleContainer,
  args: {
    title: "헬로우",
    children: <div className="bg-primary-default">--content--</div>,
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
