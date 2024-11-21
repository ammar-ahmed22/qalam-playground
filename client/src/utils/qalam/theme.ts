import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

const theme = createTheme({
  theme: "dark",
  settings: {
    background: "hsl(var(--qalampg-content1))",
    backgroundImage: "",
    foreground: "hsl(var(--qalampg-foreground))",
    caret: "#5d00ff",
    selection: "hsl(var(--qalampg-content3) / 0.5)",
    selectionMatch: "hsl(var(--qalampg-content3) / 0.3)",
    lineHighlight: "hsl(var(--qalampg-content2) / 0.7)",
    gutterBackground: "hsl(var(--qalampg-content1))",
    gutterForeground: "hsl(var(--qalampg-default-400))",
  },
  styles: [
    { tag: t.comment, color: "#ff0000" },
    { tag: t.variableName, color: "hsl(var(--qalampg-danger-600))" },
    { tag: t.propertyName, color: "hsl(var(--qalampg-danger-600))" },
    { tag: t.definitionKeyword, color: "hsl(var(--qalampg-secondary-600))" },
    { tag: t.controlKeyword, color: "hsl(var(--qalampg-secondary-600))" },
    { tag: t.self, color: "hsl(var(--qalampg-warning-600))" },
    {
      tag: t.function(t.variableName),
      color: "hsl(var(--qalampg-primary-600))",
    },
    {
      tag: [t.string, t.special(t.brace)],
      color: "hsl(var(--qalampg-success-300))",
    },
    { tag: t.number, color: "hsl(var(--qalampg-warning-500))" },
    { tag: t.bool, color: "hsl(var(--qalampg-warning-500))" },
    { tag: t.null, color: "hsl(var(--qalampg-warning-500))" },
    { tag: t.keyword, color: "hsl(var(--qalampg-secondary-600))" },
    { tag: t.modifier, color: "hsl(var(--qalampg-secondary-600))" },
    { tag: t.operator, color: "#5c6166" },
    { tag: t.className, color: "#5c6166" },
    { tag: t.definition(t.typeName), color: "#5c6166" },
    { tag: t.typeName, color: "#5c6166" },
    { tag: t.angleBracket, color: "#5c6166" },
    { tag: t.tagName, color: "#5c6166" },
    { tag: t.attributeName, color: "#5c6166" },
  ],
});

export default theme;
