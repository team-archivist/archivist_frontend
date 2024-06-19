import "@arcave/assets/style/common.css";
import "@arcave/assets/style/radix.primitives.css";
import "@arcave/assets/style/reset.css";
import "@arcave/assets/style/tailwind.css";
import "@radix-ui/themes/styles.css";

import type { Preview } from "@storybook/react";

import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

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
};

export default preview;
