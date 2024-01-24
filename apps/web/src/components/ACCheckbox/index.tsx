import { Checkbox } from "@radix-ui/themes";
import { css } from "@emotion/react";
import { SemanticColor } from "@archivist/ui";

const ACCheckbox = ({ onClick, checked, ...rest }) => {
  return (
    <Checkbox
      color="orange"
      onClick={(e) => onClick(e.target.dataset.state === "unchecked")}
      checked={checked}
      css={css`
        button {
          width: 18px;
          height: 18px;
          border: 2px solid #4d4d4d;
          border-radius: 2px;
          box-shadow: none;

          &:where([data-state="checked"]) {
            border-color: ${SemanticColor.Primary.Default};
            background-color: ${SemanticColor.Primary.Default};
          }
        }
      `}
    />
  );
};

export default ACCheckbox;
