import {
  Back,
  Bounce,
  Circ,
  Cubic,
  Elastic,
  Expo,
  Linear,
  Power1,
  Power2,
  Power3,
  Power4,
  Quad,
  Quart,
  Quint,
  Sine,
  SteppedEase,
  Strong
} from "gsap";
import { AnimationContext } from "pixi-reactive";
import { useCallback, useContext, useEffect, useReducer, useState } from "react";
import {
  EaseFunction,
  Easing,
  EasingParams,
  Tween,
  TweenAction,
  TweenContextType,
  TweenData,
  TweenDirection,
  TweenEvent,
  TweenState
} from "../types";

const defaultCallback: EaseFunction = (value: number) => value;

const useEasingEffect = (effect: Easing, params: EasingParams) => {
  const [effectCallback, setEffectCallback] = useState<EaseFunction>(() => defaultCallback);

  useEffect(() => {
    let callback: EaseFunction = defaultCallback;

    switch (effect) {
      case Easing.BounceIn:
        callback = Bounce.easeIn;
        break;
      case Easing.BounceOut:
        callback = Bounce.easeOut;
        break;
      case Easing.BounceInOut:
        callback = Bounce.easeInOut;
        break;
      case Easing.CircIn:
        callback = Circ.easeIn;
        break;
      case Easing.CircOut:
        callback = Circ.easeOut;
        break;
      case Easing.CircInOut:
        callback = Circ.easeInOut;
        break;
      case Easing.CubicIn:
        callback = Cubic.easeIn;
        break;
      case Easing.CubicOut:
        callback = Cubic.easeOut;
        break;
      case Easing.CubicInOut:
        callback = Cubic.easeInOut;
        break;
      case Easing.ExpoIn:
        callback = Expo.easeIn;
        break;
      case Easing.ExpoOut:
        callback = Expo.easeOut;
        break;
      case Easing.ExpoInOut:
        callback = Expo.easeInOut;
        break;
      case Easing.Linear:
        callback = Linear.easeNone;
        break;
      case Easing.PowerOneIn:
        callback = Power1.easeIn;
        break;
      case Easing.PowerOneOut:
        callback = Power1.easeOut;
        break;
      case Easing.PowerOneInOut:
        callback = Power1.easeInOut;
        break;
      case Easing.PowerTwoIn:
        callback = Power2.easeIn;
        break;
      case Easing.PowerTwoOut:
        callback = Power2.easeOut;
        break;
      case Easing.PowerTwoInOut:
        callback = Power2.easeInOut;
        break;
      case Easing.PowerThreeIn:
        callback = Power3.easeIn;
        break;
      case Easing.PowerThreeOut:
        callback = Power3.easeOut;
        break;
      case Easing.PowerThreeInOut:
        callback = Power3.easeInOut;
        break;
      case Easing.PowerFourIn:
        callback = Power4.easeIn;
        break;
      case Easing.PowerFourOut:
        callback = Power4.easeOut;
        break;
      case Easing.PowerFourInOut:
        callback = Power4.easeInOut;
        break;
      case Easing.QuadIn:
        callback = Quad.easeIn;
        break;
      case Easing.QuadOut:
        callback = Quad.easeOut;
        break;
      case Easing.QuadInOut:
        callback = Quad.easeInOut;
        break;
      case Easing.QuartIn:
        callback = Quart.easeIn;
        break;
      case Easing.QuartOut:
        callback = Quart.easeOut;
        break;
      case Easing.QuartInOut:
        callback = Quart.easeInOut;
        break;
      case Easing.QuintIn:
        callback = Quint.easeIn;
        break;
      case Easing.QuintOut:
        callback = Quint.easeOut;
        break;
      case Easing.QuintInOut:
        callback = Quint.easeInOut;
        break;
      case Easing.SineIn:
        callback = Sine.easeIn;
        break;
      case Easing.SineOut:
        callback = Sine.easeOut;
        break;
      case Easing.SineInOut:
        callback = Sine.easeInOut;
        break;
      case Easing.StrongIn:
        callback = Strong.easeIn;
        break;
      case Easing.StrongOut:
        callback = Strong.easeOut;
        break;
      case Easing.StrongInOut:
        callback = Strong.easeInOut;
        break;
      case Easing.BackIn:
        callback = Back.easeIn.config(typeof params[0] === 'number' ? params[0] : 1.7);
        break;
      case Easing.BackOut:
        callback = Back.easeOut.config(typeof params[0] === 'number' ? params[0] : 1.7);
        break;
      case Easing.BackInOut:
        callback = Back.easeInOut.config(typeof params[0] === 'number' ? params[0] : 1.7);
        break;
      case Easing.ElasticIn:
        callback = Elastic.easeIn.config(typeof params[0] === 'number' ? params[0] : 1, typeof params[1] === 'number' ? params[1] : 0.3);
        break;
      case Easing.ElasticOut:
        callback = Elastic.easeOut.config(typeof params[0] === 'number' ? params[0] : 1, typeof params[1] === 'number' ? params[1] : 0.3);
        break;
      case Easing.ElasticInOut:
        callback = Elastic.easeInOut.config(typeof params[0] === 'number' ? params[0] : 1, typeof params[1] === 'number' ? params[1] : 0.3);
        break;
      case Easing.Steps:
        callback = SteppedEase.config(typeof params[0] === 'number' ? params[0] : 10);
        break;
    }

    setEffectCallback(() => callback);
  }, [effect, params]);

  return effectCallback;
};

const useTweenPosition = (progress: number, ease: Easing, params: EasingParams): number => {
  const easingFunction = useEasingEffect(ease, params);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition(easingFunction(progress));
  }, [easingFunction, progress]);

  return position;
};

export const useTweenAnimation = <T extends TweenData>(
  from: T,
  to: T,
  duration: number,
  ease = Easing.Linear,
  easeParams?: string,
  onEvent?: (event: TweenEvent) => void
): TweenContextType<T> => {
  const tweenReducer = useCallback((tween: Tween, action: TweenAction): Tween => {
    const currentPosition = action.duration * tween.progress;
    const { elapsed = 0, duration } = action;
    let direction: TweenDirection = action.direction || tween.direction;
    let progress;

    switch (action.type) {
      case TweenState.Reset:
        return {
          direction: TweenDirection.Forward,
          progress: 0
        };
      case TweenState.Set:
        return {
          direction: TweenDirection.Forward,
          progress: (elapsed % duration) / duration
        };
      case TweenState.Play:
        switch (direction) {
          case TweenDirection.Forward:
            progress = Math.min(currentPosition + elapsed, duration) / duration;
            if (progress === 1 && onEvent) {
              onEvent(TweenEvent.AnimationComplete)
            }
            return {
              direction,
              progress
            };
          case TweenDirection.Backward:
            progress = Math.min(currentPosition - elapsed, duration) / duration;
            if (progress === 0 && onEvent) {
              onEvent(TweenEvent.AnimationComplete)
            }
            return {
              direction,
              progress
            };
        }
        break;
      case TweenState.Loop:
        switch (direction) {
          case TweenDirection.Forward:
            progress = (currentPosition + elapsed) % duration;
            if (progress < currentPosition  && onEvent) {
              onEvent(TweenEvent.AnimationIterate)
            }
            return {
              direction,
              progress: progress / duration
            };
          case TweenDirection.Backward:
            progress = (currentPosition - elapsed) % duration;
            if (progress > currentPosition  && onEvent) {
              onEvent(TweenEvent.AnimationIterate)
            }
            return {
              direction,
              progress: progress / duration
            };
        }
        break;
      case TweenState.Alternate:
        switch (direction) {
          case TweenDirection.Forward:
            progress = currentPosition + elapsed;
            if (progress > duration) {
              direction = TweenDirection.Backward;
              progress = duration - (progress % duration);
              if (onEvent) {
                onEvent(TweenEvent.AnimationInvert)
              }
            }
            return {
              direction,
              progress: progress / duration
            };
          case TweenDirection.Backward:
            progress = currentPosition - elapsed;
            if (progress < 0) {
              direction = TweenDirection.Forward;
              progress = 0 - progress;
              if (onEvent) {
                onEvent(TweenEvent.AnimationInvert)
              }
            }
            return {
              direction,
              progress: progress / duration
            };
        }
        break;
      default:
        return tween;
    }
  }, [onEvent]);
  const { frameId, elapsed } = useContext(AnimationContext);
  const [params, setParams] = useState<EasingParams>([]);
  const [tweenState, updateTweenState] = useReducer(tweenReducer, {
    direction: TweenDirection.Forward,
    progress: 0
  });
  const { direction, progress } = tweenState;
  const position = useTweenPosition(progress, ease, params);
  const [type, setType] = useState(TweenState.Stop);
  const [source, setSource] = useState<T>(from);
  const [state, setState] = useReducer((previousState: T, newState: T) => {
    if (JSON.stringify(previousState) !== JSON.stringify(newState)) {
      return newState;
    } else {
      return previousState;
    }
  }, source);

  const start = useCallback(
    (type: TweenState, direction = TweenDirection.Forward) => {
      switch (type) {
        case TweenState.Alternate:
        case TweenState.Loop:
        case TweenState.Play:
          onEvent && onEvent(TweenEvent.AnimationStart);
      }
      setType(type);
      updateTweenState({
        type,
        direction,
        duration
      });
    },
    [duration, onEvent]
  );

  const play = useCallback((direction?: TweenDirection) => start(TweenState.Play, direction), [start]);
  const loop = useCallback((direction?: TweenDirection) => start(TweenState.Loop, direction), [start]);
  const alternate = useCallback((direction?: TweenDirection) => start(TweenState.Alternate, direction), [start]);

  const stop = useCallback(
    (reset = false) => {
      setType(TweenState.Stop);
      updateTweenState({
        type: reset ? TweenState.Reset : TweenState.Stop,
        duration
      });
    },
    [duration]
  );

  const reverse = useCallback(() => {
    updateTweenState({
      type,
      duration,
      direction: direction === TweenDirection.Forward ? TweenDirection.Backward : TweenDirection.Forward
    });
  }, [duration, direction, type]);

  const setTime = useCallback(
    (time: number) => {
      setType(TweenState.Stop);
      updateTweenState({
        type: TweenState.Set,
        duration,
        elapsed: time
      });
    },
    [duration]
  );

  useEffect(() => {
    if (easeParams && easeParams.length > 0) {
      const params = easeParams.split(/,\s+/).map((value) => Number(value));
      setParams(params);
    } else {
      setParams([]);
    }
  }, [easeParams]);

  useEffect(() => {
    updateTweenState({
      type,
      direction,
      duration,
      elapsed
    });
  }, [frameId, elapsed, type, duration, direction]);

  useEffect(() => {
    if (type === TweenState.Reset) {
      setSource(from);
    }
  }, [from, type]);

  useEffect(() => {
    if (typeof source === 'number' && typeof to === 'number') {
      setState(((to - source) * position + source) as T);
    } else if (typeof source !== 'number' && typeof to !== 'number') {
      const newState: TweenData = {};
      Object.keys(to).forEach((key) => {
        const fromValue = source[key];
        if (typeof fromValue === 'number') {
          const toValue = to[key];
          newState[key] = (toValue - fromValue) * position + fromValue;
        }
      });
      setState(newState as T);
    }
  }, [source, to, position]);

  return {
    state,
    controls: {
      play,
      loop,
      alternate,
      stop,
      reverse,
      setTime
    }
  };
};
