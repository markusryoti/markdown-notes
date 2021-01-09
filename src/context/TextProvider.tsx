/* eslint-disable object-shorthand */
import React, { useReducer } from 'react';

interface IState {
  text: string;
  previewMode: boolean;
}

interface TextProviderContextType {
  currentState: IState;
  setText: (newText: string) => void;
  togglePreviewMode: () => void;
}
const contextInitialState: TextProviderContextType = {
  currentState: {
    text: '',
    previewMode: false,
  },
  setText: () => {},
  togglePreviewMode: () => {},
};

export const TextContext = React.createContext<TextProviderContextType>(
  contextInitialState
);

type ACTIONTYPE = { type: 'setText'; payload: string } | { type: 'setPreview' };

const textReducer = (state: IState, action: ACTIONTYPE) => {
  switch (action.type) {
    case 'setText':
      return {
        ...state,
        text: action.payload,
      };

    case 'setPreview':
      return {
        ...state,
        previewMode: !state.previewMode,
      };

    default:
      return state;
  }
};

export const TextProvider = ({ children }: any) => {
  const initState: IState = {
    text: '',
    previewMode: false,
  };
  const [state, dispatch] = useReducer(textReducer, initState);

  const setText = (newText: string) => {
    dispatch({ type: 'setText', payload: newText });
  };

  const togglePreviewMode = () => {
    dispatch({ type: 'setPreview' });
  };

  return (
    // eslint-disable-next-line object-shorthand
    <TextContext.Provider
      value={{
        currentState: { text: state.text, previewMode: state.previewMode },
        setText: setText,
        togglePreviewMode: togglePreviewMode,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};
