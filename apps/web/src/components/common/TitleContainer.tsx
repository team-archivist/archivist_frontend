import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface TitleContainerProps {}

export default function TitleContainer({
  className,
  title,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & TitleContainerProps) {
  return (
    <div className={twMerge("flex flex-col space-y-2", className)} {...props}>
      <div className="text-text-normal text-14">{title}</div>
      {children}
    </div>
  );
}
