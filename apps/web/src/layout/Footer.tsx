import Link from "next/link";

import ARCAVE_LOGO from "@arcave/assets/icons/logo_black.svg";
import { HTMLAttributes } from "react";
interface FooterProps {}

export default function Footer({}: HTMLAttributes<HTMLDivElement> &
  FooterProps) {
  return (
    <div className="bg-[#f5f5f5] flex flex-col items-center">
      <div className="px-6 sm:px-8 py-10 sm:py-14 space-y-4 max-w-[970px] w-full">
        <ARCAVE_LOGO />
        <div className="flex flex-col sm:space-y-0 space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <Link
              href="https://www.notion.so/1be62413018d4dd7bcb264eda505635c"
              target="_blank"
              className="text-text-alternative text-14"
            >
              이용약관
            </Link>
            <div className="w-[1px] h-[8px] bg-text-disable hidden sm:block" />
            <Link
              href="https://www.notion.so/e566e1eac53a4a859a38e878d461fda2"
              target="_blank"
              className="text-text-alternative text-14"
            >
              개인정보처리방침
            </Link>
            <div className="w-[1px] h-[8px] bg-text-disable hidden sm:block" />
            <Link
              href="https://www.notion.so/Help-Support-203a2e43cb36438a95b52e8fa86c6c41"
              target="_blank"
              className="text-text-alternative text-14"
            >
              help & support
            </Link>
          </div>
          <div>
            <div className="text-14 text-text-alternative">
              Contact team.arcave@gmail.com
            </div>
          </div>
          <div>
            <div className="text-text-normal font-medium">
              Copyright ⓒ Arcave All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
