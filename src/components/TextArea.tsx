/* eslint-disable react/display-name */
import React, { useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { TextContext } from '../context/TextProvider';

const TextArea: React.FC = () => {
  const { currentState, setText } = useContext(TextContext);
  const { text } = currentState;

  // Main process provides the file contents on app start
  ipcRenderer.on(
    'initialMarkdownUpdate',
    (_: Electron.IpcRendererEvent, args: string) => {
      setText(args);
    }
  );

  // When app opens do a request for file contents
  useEffect(() => {
    ipcRenderer.send('initialMarkdownRequest');
  }, []);

  // Send ipc message when state changes
  // Avoids concurrency issues with useEffect which happen if the state
  // if ipc process is done in updateText function
  useEffect(() => {
    ipcRenderer.send('markdownTextUpdate', text);
  }, [text]);

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="markdown-text-area-container">
      <textarea
        className="markdown-text-area"
        spellCheck="false"
        value={text}
        onChange={updateText}
      />
    </div>
  );
};

export default TextArea;
