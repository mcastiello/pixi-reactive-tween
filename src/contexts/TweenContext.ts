import React from 'react';
import { TweenContextType, TweenProps } from '../types';

const defaultTweenContext: TweenContextType<TweenProps> = {
  state: {},
  controls: {
    play: () => null,
    loop: () => null,
    alternate: () => null,
    stop: () => null,
    reverse: () => null,
    setTime: () => null
  }
};

export const TweenContext = React.createContext(defaultTweenContext);
