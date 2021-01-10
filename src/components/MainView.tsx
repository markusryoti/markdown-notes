/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import { TextContext } from '../context/TextProvider';
import MarkdownView from './MarkdownView';
import TextArea from './TextArea';
import Toolbar from './Toolbar';

export default function MainView() {
  const { currentState } = useContext(TextContext);

  return (
    <>
      <Toolbar />
      {currentState.previewMode ? <MarkdownView /> : <TextArea />}
    </>
  );
}
