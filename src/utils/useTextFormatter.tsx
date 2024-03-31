/*
  This util is used to format the text input and output in the main chat box.
  Normally, AI engines respond with Markdown text, but you can change the
  formatter below to suit any other response formats the specific engine you
  are using may require.
*/

import React from 'react';
import CodeBlock from '../components/CodeBlock';

const textFormatter = (text: string): React.ReactNode => {
  // First, we check if the text is a code snippet
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const codeMatch = text.match(codeBlockRegex);
  // If we detect code, we embed it using out CodeBlock component
  if (codeMatch) {
    // Extract the code without the backticks
    const code = codeMatch[0].replace(/```/g, '').trim();
    return <CodeBlock code={code} />;
  }

  // Process any non-code texts using Markdown regex
  let processedText = text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n/g, '<br />'); // Convert line breaks to <br />

  return <div dangerouslySetInnerHTML={{ __html: processedText }} />;
};

export default textFormatter;
