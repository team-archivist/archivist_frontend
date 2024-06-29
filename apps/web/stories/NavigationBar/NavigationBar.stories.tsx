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

export const LoggedIn: Story = {
  args: {
    currentUser: {
      imgUrl:
        "https://cached-resizable-images.orangefield.co.kr/20240623120225_4d313137-ff75-48b7-b49f-bf9702e96a8b.jpg",
    } as any,
  },
};

export const LoggedInMycave: Story = {
  args: {
    currentPath: "mycave",
    currentUser: {
      imgUrl:
        "https://cached-resizable-images.orangefield.co.kr/20240623120225_4d313137-ff75-48b7-b49f-bf9702e96a8b.jpg",
    } as any,
  },
};
