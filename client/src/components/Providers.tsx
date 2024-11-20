import React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider } from "../context/theme";

export default function Providers({ children } : { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider
        defaultClasses="bg-background text-foreground min-h-screen"
        defaultTheme="dark"
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}