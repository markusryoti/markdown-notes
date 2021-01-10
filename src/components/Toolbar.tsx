/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable prefer-template */
/* eslint-disable promise/always-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */

import path from 'path';
import React, { useContext, useState } from 'react';
import { TextContext } from '../context/TextProvider';
import { writeMarkdownToFileWithPath } from '../fileio/io';

const { dialog } = require('electron').remote;
const { shell } = require('electron').remote;

interface IFileSaveResponse {
  canceled: boolean;
  filePath?: string;
  bookmark?: string;
}

const Toolbar: React.FC = () => {
  const { currentState, togglePreviewMode, setText } = useContext(TextContext);
  const [infoText, setInfoText] = useState('');

  const handlePreviewIconClick = (e: any): void => {
    e.target.id === 'preview-mode-btn'
      ? setInfoText('Edit Mode')
      : setInfoText('Enable Preview');
    togglePreviewMode();
  };

  const handleSaveIconClick = (): void => {
    dialog
      .showSaveDialog({
        title: 'Save markdown file',
        filters: [{ name: 'Markdown Files', extensions: ['md'] }],
      })
      .then((res: IFileSaveResponse) => {
        if (!res.canceled && res.filePath) {
          const selectedPath = res.filePath.endsWith('.md')
            ? res.filePath
            : res.filePath + '.md';
          writeMarkdownToFileWithPath(currentState.text, selectedPath);
        }
      })
      .catch((err: any) => console.log(err));
  };

  const handleClearIconClick = (): void => {
    setText('');
  };

  const handleFolderIconClick = (): void => {
    shell.showItemInFolder(path.join(process.cwd(), 'notes.md'));
  };

  const handleIconHover = (e: any): void => {
    switch (e.target.id) {
      case 'preview-mode-btn':
        setInfoText('Enable Preview');
        break;

      case 'edit-mode-btn':
        setInfoText('Edit Mode');
        break;

      case 'save-btn':
        setInfoText('Save');
        break;

      case 'clear-btn':
        setInfoText('Clear');
        break;

      case 'folder-btn':
        setInfoText('Open Folder');
        break;

      default:
        break;
    }
  };

  return (
    <div className="icon-container">
      {currentState.previewMode ? (
        <i
          id="edit-mode-btn"
          className="fas fa-2x fa-eye-slash"
          onClick={handlePreviewIconClick}
          onMouseOver={handleIconHover}
          onMouseLeave={() => setInfoText('')}
        />
      ) : (
        <i
          id="preview-mode-btn"
          className="fas fa-2x fa-eye"
          onClick={handlePreviewIconClick}
          onMouseOver={handleIconHover}
          onMouseLeave={() => setInfoText('')}
        />
      )}
      <i
        id="save-btn"
        className="fas fa-2x fa-save"
        onClick={handleSaveIconClick}
        onMouseOver={handleIconHover}
        onMouseLeave={() => setInfoText('')}
      />
      <i
        id="clear-btn"
        className="fas fa-2x fa-ban"
        onClick={handleClearIconClick}
        onMouseOver={handleIconHover}
        onMouseLeave={() => setInfoText('')}
      />
      <i
        id="folder-btn"
        className="fas fa-2x fa-folder-open"
        onClick={handleFolderIconClick}
        onMouseOver={handleIconHover}
        onMouseLeave={() => setInfoText('')}
      />
      <p id="hover-option">{infoText}</p>
    </div>
  );
};

export default Toolbar;
