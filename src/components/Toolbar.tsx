/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { TextContext } from '../context/TextProvider';

const Toolbar: React.FC = () => {
  const { currentState, togglePreviewMode } = useContext(TextContext);

  const handleIconClick = () => {
    togglePreviewMode();
  };

  return (
    <div className="preview-icon-container" onClick={handleIconClick}>
      {currentState.previewMode ? (
        <i className="fas fa-2x fa-eye-slash" />
      ) : (
        <i className="fas fa-2x fa-eye" />
      )}
    </div>
  );
};

export default Toolbar;
