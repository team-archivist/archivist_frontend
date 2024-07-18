import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TitleContainerProps {
  required?: boolean;
}

export default function TitleContainer({
  className,
  title,
  required,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & TitleContainerProps) {
  return (
    <div className={twMerge("flex flex-col space-y-2", className)} {...props}>
      <div className="text-text-normal text-14">
        {required && <span className="text-status-alert">*</span>}
        {title}
      </div>
      {children}
    </div>
  );
}
