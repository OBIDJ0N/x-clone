import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  label: ReactNode | string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  type?: "button" | "submit";
  onclick?: () => void;
}

export default function Button({
  label,
  onclick,
  disabled,
  fullWidth,
  large,
  outlined,
  secondary,
  type,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={cn(
        "rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed",
        fullWidth ? "w-full" : "w-fit",
        secondary ? "bg-white text-black" : "bg-sky-500 text-white",
        large ? "text-xl px-5 py-3" : "text-md px-4 py-3",
        outlined
          ? "bg-transparent border-slate-600 text-sky-500 hover:bg-slate-800/40"
          : ""
      )}
    >
        {label}
    </button>
  );
}
