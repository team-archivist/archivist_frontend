import { NavigationBar } from "@arcave/components/NavigationBar";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof NavigationBar>;

const meta: Meta<typeof NavigationBar> = {
  component: NavigationBar,
  args: {
    currentPath: "",
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
