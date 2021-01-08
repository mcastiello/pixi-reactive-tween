import { PropsContext } from 'pixi-reactive';
import React, { useContext, useEffect } from 'react';
import { useTweenAnimation } from '../hooks/tweenHooks';
import { TweenContext } from '../contexts/TweenContext';
import { TweenComponentProps, TweenContextType, TweenData, TweenDirection, TweenProps, TweenState } from '../types';

const PixiTween: React.FC<TweenComponentProps> = ({
  duration = 1000,
  ease,
  easeParams,
  state = TweenState.Stop,
  direction = TweenDirection.Forward,
  time,
  children,
  ...props
}) => {
  const { properties, updateProperties } = useContext(PropsContext);
  const tween = useTweenAnimation(properties as TweenData, props, duration, ease);
  const { state: tweenState, controls } = tween;
  const { setTime, play, stop, alternate, loop } = controls;

  useEffect(() => {
    if (typeof time === 'number') {
      setTime(time);
    }
  }, [time, setTime]);

  useEffect(() => {
    switch (state) {
      case TweenState.Play:
        play(direction);
        break;
      case TweenState.Loop:
        loop(direction);
        break;
      case TweenState.Alternate:
        alternate(direction);
        break;
      case TweenState.Stop:
        stop(false);
        break;
      case TweenState.Reset:
        stop(true);
    }
  }, [state, direction, play, stop, alternate, loop]);

  useEffect(() => {
    updateProperties(tweenState as TweenProps);
  }, [tweenState, updateProperties]);

  return <TweenContext.Provider value={tween as TweenContextType<TweenProps>}>{children}</TweenContext.Provider>;
};

export default PixiTween;
