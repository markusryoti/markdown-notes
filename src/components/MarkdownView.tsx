/* eslint-disable react/no-danger */
import React, { useContext } from 'react';
import marked from 'marked';
import { TextContext } from '../context/TextProvider';

const MarkdownView: React.FC = () => {
  const { currentState } = useContext(TextContext);
  const { text } = currentState;

  return (
    <div className="markdown-text-area-container">
      <div
        className="markdown-preview-area markdown-text-area"
        dangerouslySetInnerHTML={{
          __html: marked(text),
        }}
      />
    </div>
  );
};

export default MarkdownView;
