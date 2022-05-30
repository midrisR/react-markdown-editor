import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const RenderMd = ({ markdown }) => (
  <ReactMarkdown
    children={markdown}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            style={dark}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
    }}
  />
);

const Markdown = () => {
  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange", html, text);
  };

  const codeString = "(num) => num + 1";

  return (
    <div className="App">
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => <RenderMd markdown={text} />}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default Markdown;
