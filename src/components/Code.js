import React, { useContext } from "react";
import { Code } from "react-code-blocks";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  zenburn,
  solarizedLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

import { LayoutContext } from "../context/LayoutContext";

export const CodeBlock = ({
  className = "",
  text,
  language = "jsx",
  showLineNumbers = true,
}) => {
  const { layout } = useContext(LayoutContext);
  const style = layout.palette.mode === "dark" ? zenburn : solarizedLight;

  return (
    <SyntaxHighlighter
      language={language}
      style={style}
      showLineNumbers={showLineNumbers}
      wrapLongLines={true}
      customStyle={{
        margin: 0,
        fontSize: "0.8em",
        fontFamily: "monospace",
      }}
      lineNumberStyle={{
        opacity: 0.45,
        minWidth: "2.5em",
      }}
    >
      {text}
    </SyntaxHighlighter>
  );
};

export const CodeInline = ({ text, language = "jsx" }) => {
  const { layout } = useContext(LayoutContext);
  const theme = layout.palette.mode === "dark" ? zenburn : solarizedLight;

  return (
    <code
      className="font-mono text-xs rounded"
      style={{
        backgroundColor: theme.hljs?.background || "var(--bg2)",
        color: theme.hljs?.color || "var(--txt)",
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
        padding: "2px 6px",
      }}
    >
      {text}
    </code>
  );
};
