import React from "react";
import { twMerge } from "tailwind-merge";

export type InfoBoxProps<E extends React.ElementType> = {
  as?: E;
  children?: React.ReactNode;
  className?: string;
  status?: "success" | "danger" | "warning" | "default";
} & React.ComponentPropsWithoutRef<E>;

export default function InfoBox<E extends React.ElementType>({
  as,
  children,
  className = "",
  status = "default",
  ...props
}: InfoBoxProps<E>) {
  const Component = as || "div";
  const bgs = {
    success: "bg-success-200/20",
    danger: "bg-danger-200/20",
    warning: "bg-warning-200/20",
    default: "bg-default-200/20",
  };
  return (
    <Component
      className={twMerge(
        `${bgs[status]} py-2 px-4 rounded-md border-l-8 border-${status}`,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
