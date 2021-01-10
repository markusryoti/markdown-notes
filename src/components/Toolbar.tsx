/* eslint-disable prefer-template */
/* eslint-disable promise/always-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { TextContext } from '../context/TextProvider';
import { writeMarkdownToFileWithPath } from '../fileio/io';

const { dialog } = require('electron').remote;

interface IFileSaveResponse {
  canceled: boolean;
  filePath?: string;
  bookmark?: string;
}

const Toolbar: React.FC = () => {
  const { currentState, togglePreviewMode, setText } = useContext(TextContext);

  const handlePreviewIconClick = (): void => {
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

  return (
    <div className="preview-icon-container">
      {currentState.previewMode ? (
        <i
          className="fas fa-2x fa-eye-slash"
          onClick={handlePreviewIconClick}
        />
      ) : (
        <i className="fas fa-2x fa-eye" onClick={handlePreviewIconClick} />
      )}
      <i className="fas fa-2x fa-save" onClick={handleSaveIconClick} />
      <i className="fas fa-2x fa-ban" onClick={handleClearIconClick} />
    </div>
  );
};

export default Toolbar;
