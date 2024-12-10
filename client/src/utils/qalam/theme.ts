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
      { tag: t.comment, color: "#928374" }, // Matches "comment" color in Gruvbox
      { tag: t.variableName, color: "#d3869b" }, // Matches "variable" color in Gruvbox
      { tag: t.propertyName, color: "#d4be98" }, // Matches "property" color in Gruvbox
      { tag: t.definitionKeyword, color: "#ea6962" }, // Matches "Keyword" color in Gruvbox
      { tag: t.controlKeyword, color: "#e78a4e" }, // Matches "Storage" color in Gruvbox
      { tag: t.self, color: "#d3869b" }, // Matches "Special identifier" color in Gruvbox
      {
          tag: t.function(t.variableName),
          color: "#a9b665", // Matches "Function" color in Gruvbox
      },
      {
          tag: [t.string, t.special(t.brace)],
          color: "#d8a657", // Matches "String" color in Gruvbox
      },
      { tag: t.number, color: "#d3869b" }, // Matches "Number" color in Gruvbox
      { tag: t.bool, color: "#d3869b" }, // Matches "Boolean" color in Gruvbox
      { tag: t.null, color: "#d3869b" }, // Matches "Constant" color in Gruvbox
      { tag: t.keyword, color: "#ea6962" }, // Matches "Keyword" color in Gruvbox
      { tag: t.modifier, color: "#e78a4e" }, // Matches "Storage" color in Gruvbox
      { tag: t.operator, color: "#e78a4e" }, // Matches "Operator" color in Gruvbox
      { tag: t.className, color: "#7daea3" }, // Matches "Class" color in Gruvbox
      { tag: t.definition(t.typeName), color: "#7daea3" }, // Matches "Type" color in Gruvbox
      { tag: t.typeName, color: "#7daea3" }, // Matches "Type" color in Gruvbox
      { tag: t.angleBracket, color: "#928374" }, // Matches "Delimiter" color in Gruvbox
      { tag: t.tagName, color: "#e78a4e" }, // Matches "Html orange" in Gruvbox
      { tag: t.attributeName, color: "#d8a657" }, // Matches "Html yellow" in Gruvbox
  ]
});

export default theme;
