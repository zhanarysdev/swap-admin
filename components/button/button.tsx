import { ReactNode } from "react";

export enum ButtonBG {
  primary,
  orange,
  grey,
  red,
  white,
}
enum ButtonBGValues {
  primary = "#BEFF1B",
  orange = "#FFB71B",
  grey = "#383838",
  red = "#FF1B1F",
  white = "#FFFFFF",
}

export function Button({
  label,
  bg = ButtonBG.primary,
  onClick,
  type,
  preIcon,
  styles,
  disabled,
}: {
  label: string;
  bg?: ButtonBG;
  onClick?: () => void;
  type?: "submit" | "button";
  preIcon?: ReactNode;
  styles?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${bg == ButtonBG.grey || bg == ButtonBG.red ? "text-white" : "text-black"
        } 
      min-h-[44px] gap-2 flex items-center px-4 rounded-2xl ${styles} ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      style={{
        backgroundColor:
          ButtonBGValues[ButtonBG[bg] as keyof typeof ButtonBGValues],
      }}
    >
      {preIcon}
      <span>{label}</span>
    </button>
  );
}
