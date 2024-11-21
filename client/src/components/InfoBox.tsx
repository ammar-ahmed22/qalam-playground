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
  return (
    <Component
      className={twMerge(
        `bg-${status}-200/20 py-2 px-4 rounded-md border-l-8 border-${status}`,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
