import React, { ButtonHTMLAttributes, ReactNode } from "react";

import "./Button.scss";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "error" | "primary_gradient";
  children: ReactNode;
}

const Button: React.FC<IButton> = ({
  children,
  variant = "primary",

  ...rest
}) => {
  const getClassName = (type: string) => {
    switch (type) {
      case "secondary":
        return "btn-secondary";
      case "error":
        return "btn-error";
      case "primary_gradient":
        return "btn-primary-gradient";
      default:
        return "btn-primary";
    }
  };

  return (
    <button className={getClassName(variant)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
