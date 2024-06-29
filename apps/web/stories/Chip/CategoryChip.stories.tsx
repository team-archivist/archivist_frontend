import CategoryChip from "@arcave/components/Chip/CategoryChip";
import { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<typeof CategoryChip>;

const meta: Meta<typeof CategoryChip> = {
  component: CategoryChip,
  args: {
    children: "카테고리",
    isActive: false,
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
