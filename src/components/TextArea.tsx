/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

export default function TextArea() {
  const [text, setText] = useState('');

  // Main process provides the file contents
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
  // Avoids concurrency issues
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
}
