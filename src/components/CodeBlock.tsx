import React, { useState } from 'react'
import { Clipboard } from 'react-feather'

interface CodeBlockProps {
  code: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Code')

  /* code processor to run checks and actions before the final code is issued to the user */
  const processCode = (inputCode: string): string => {
    /* this check supresses the first character if it is a blank space */
    if (inputCode.startsWith(' ')) {
      return inputCode.substring(1)
    }
    return inputCode
  }

  const processedCode = processCode(code)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(processedCode).then(
      () => {
        setCopyButtonText('On Clipboard!')
        setTimeout(() => {
          setCopyButtonText('Copy Code')
        }, 2000)
      },
      () => {
        setCopyButtonText('Failed to copy. Try again.')
        setTimeout(() => {
          setCopyButtonText('Copy Code')
        }, 2000)
      }
    )
  }

  return (
    <div
      style={{
        backgroundColor: '#111',
        padding: '0px',
        margin: '10px',
        borderRadius: '16px',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.025)',
          padding: '15px',
          borderRadius: '16px 16px 0px 0px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Nepture Code Block</span>
        <button
          onClick={copyToClipboard}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#FFF',
            cursor: 'pointer',
            fontSize: '8pt',
          }}
        >
          <Clipboard size={10} /> <span>{copyButtonText}</span>
        </button>
      </div>
      <div
        style={{
          backgroundColor: '#111',
          borderRadius: '0px 0px 16px 16px',
          padding: '15px',
          whiteSpace: 'pre-wrap',
        }}
      >
        <code
          style={{
            color: '#FFF',
            padding: '10px',
            margin: 0,
            display: 'block',
            textAlign: 'left',
          }}
        >
          {processedCode}
        </code>
      </div>
    </div>
  )
}

export default CodeBlock