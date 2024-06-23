import HomeFeedView from "@arcave/components/views/HomeFeedView";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof HomeFeedView>;

const meta: Meta<typeof HomeFeedView> = {
  component: HomeFeedView,
  args: {},
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
