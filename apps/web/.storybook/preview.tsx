import React from "react";

import "@arcave/assets/style/common.css";
import "@arcave/assets/style/radix.primitives.css";
import "@arcave/assets/style/reset.css";
import "@arcave/assets/style/tailwind.css";
import "@radix-ui/themes/styles.css";

import type { Preview } from "@storybook/react";

import { Theme } from "@radix-ui/themes";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { StoryContext } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: { ...INITIAL_VIEWPORTS },
    },
    backgrounds: {
      values: [{ name: "black", value: "rgba(0, 0, 0, 1)" }],
    },
  },
  globalTypes: {},
  decorators: [
    (Story: any, context: StoryContext) => {
      return (
        <Theme style={{ height: "100vh" }}>
          <Story />
        </Theme>
      );
    },
  ],
};

export default preview;
