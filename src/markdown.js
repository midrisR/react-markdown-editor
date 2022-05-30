import React from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const RenderMd = ({ markdown }) => (
  <ReactMarkdown
    children={markdown}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            style={atomDark}
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
  const text1 = `~~~js
console.log('It works!')
~~~`;
  return (
    <div className="App">
      {/* <RenderMd markdown={text} /> */}
      <MdEditor
        style={{ height: "500px" }}
        renderHTML={(text) => <RenderMd markdown={text} />}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default Markdown;
