import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

const CategoryChip = ({ onClick, isActive, children }: any) => {
  if (!onClick) {
    onClick = (e) => {};
  }

  const classNames = {
    button: isActive ? "bg-gray-600" : "bg-gray-200",
    text: isActive ? "text-white" : "text-text-normal",
  };

  return (
    <button
      className={`${classNames.button} inline-flex items-center justify-center h-[36px] rounded-full gap-2 pl-4 pr-3 cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e, children);
      }}
    >
      <span
        className={`${classNames.text} text-text-normal text-label2-14 leading-label2-14`}
      >
        {children}
      </span>
      {isActive ? <Cross2Icon style={{ stroke: "#fff" }} /> : <PlusIcon />}
    </button>
  );
};

export default CategoryChip;
