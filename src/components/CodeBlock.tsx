import React, { useState } from "react";
import { Clipboard } from "react-feather";
import {
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockWrapper,
  CopyToClipboardButton,
  ProcessedCode,
  ProcessedCodeWrapper
} from "../styles/CodeBlockStyles";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copyButtonText, setCopyButtonText] = useState("Copy Code");

  /* code processor to run checks and actions before the final code is issued to the user */
  const processCode = (inputCode: string): string => {
    /* this check supresses the first character if it is a blank space */
    if (inputCode.startsWith(" ")) {
      return inputCode.substring(1);
    }
    return inputCode;
  };

  const processedCode = processCode(code);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(processedCode).then(
      () => {
        setCopyButtonText("On Clipboard!");
        setTimeout(() => {
          setCopyButtonText("Copy Code");
        }, 2000);
      },
      () => {
        setCopyButtonText("Failed to copy. Try again.");
        setTimeout(() => {
          setCopyButtonText("Copy Code");
        }, 2000);
      }
    );
  };

  return (
    <CodeBlockWrapper>
      <CodeBlockHeader>
        <CodeBlockTitle>Nepture AI Code Block</CodeBlockTitle>
        <CopyToClipboardButton onClick={copyToClipboard}>
          <Clipboard size={10} /> <span>{copyButtonText}</span>
        </CopyToClipboardButton>
      </CodeBlockHeader>
      <ProcessedCodeWrapper>
        <ProcessedCode>{processedCode}</ProcessedCode>
      </ProcessedCodeWrapper>
    </CodeBlockWrapper>
  );
};

export default CodeBlock;
