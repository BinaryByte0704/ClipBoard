import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "gradient";
  size: "sm" | "lg";
  text: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  onClick?: () => void;
}

const variantStyle = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-blue-200 text-blue-700 hover:bg-blue-300",
  gradient:
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 transition-transform duration-300",
};

const sizeStyle = {
  sm: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-lg",
};

const defaultStyle =
  "flex gap-2 rounded-xl font-semibold items-center justify-center shadow-md transition-all duration-300";

const ButtonUi = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyle[variant]} ${sizeStyle[size]} ${defaultStyle}`}
    >
      {startIcon && <span>{startIcon}</span>}
      {text}
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};

export default ButtonUi;
