import React from "react";
import clsx from "../../lib/clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "danger" | "secondary" | "primary" | "destructive";
  size?: "sm" | "md" | "lg" | "icon" | "full";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "rounded font-medium transition-colors",
        variant === "default" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "outline" && "border border-blue-500 text-blue-500 hover:bg-blue-100",
        variant === "secondary" && "bg-gray-200 text-gray-800 hover:bg-gray-300",
        variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
        size === "sm" && "px-2 py-1 text-sm",
        size === "md" && "px-4 py-2",
        size === "lg" && "px-6 py-3 text-lg",
        size === "icon" && "p-2 w-8 h-8 flex items-center justify-center",
        size === "full" && "w-full py-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
