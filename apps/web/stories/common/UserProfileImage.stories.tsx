import UserProfileImage from "@arcave/components/common/UserProfileImage";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof UserProfileImage>;

const meta: Meta<typeof UserProfileImage> = {
  component: UserProfileImage,
  args: {
    src: "https://cached-resizable-images.orangefield.co.kr/20240623120225_4d313137-ff75-48b7-b49f-bf9702e96a8b.jpg",
  },
};

export default meta;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    containerClassName: "w-8 h-8",
  },
};
