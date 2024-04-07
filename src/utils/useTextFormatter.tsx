import React from "react";
import CodeBlock from "../components/CodeBlock";

const textFormatter = (text: string): React.ReactNode => {
  // Split text by code blocks while keeping the delimiters (code blocks)
  // Updated regex to capture optional language identifiers
  const splitText = text.split(/(```\w*\n[\s\S]*?```)/g);

  return (
    <>
      {splitText.map((segment, index) => {
        // Check if the segment is a code block, updated to consider optional language identifiers
        const codeBlockMatch = segment.match(/```(?:\w*\n)?([\s\S]*?)```/);
        if (codeBlockMatch) {
          // Extract the code directly from the match group, which excludes the language identifier
          const code = codeBlockMatch[1].trim();
          return <CodeBlock key={index} code={code} />;
        } else {
          // Process any non-code texts using innerHTML for simplicity in this example
          const processedText = segment
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/gim, "<em>$1</em>")
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
            .replace(/\n/g, "<br />");

          return <div key={index} dangerouslySetInnerHTML={{ __html: processedText }} />;
        }
      })}
    </>
  );
};

export default textFormatter;
