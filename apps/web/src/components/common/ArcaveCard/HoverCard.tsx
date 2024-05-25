import {
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger,
  Text,
} from "@radix-ui/themes";

const HoverCard = ({ value, children }) => {
  return (
    <HoverCardRoot>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent size="1">
        <Text as="div" size="1" style={{ maxWidth: 325 }}>
          {value}
        </Text>
      </HoverCardContent>
    </HoverCardRoot>
  );
};

export default HoverCard;
