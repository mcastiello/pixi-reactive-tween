import { Easing } from './Easing';

export enum TweenState {
  Reset,
  Play,
  Stop,
  Loop,
  Alternate,
  Set
}

export enum TweenDirection {
  Forward,
  Backward
}

export type TweenAction = {
  type: TweenState;
  direction?: TweenDirection;
  duration: number;
  elapsed?: number;
};

export type Tween = {
  progress: number;
  direction: TweenDirection;
};

export type TweenControls = {
  play: (direction?: TweenDirection) => void;
  loop: (direction?: TweenDirection) => void;
  alternate: (direction?: TweenDirection) => void;
  stop: (reset?: boolean) => void;
  reverse: () => void;
  setTime: (time: number) => void;
};

export type TweenProps = { [k in string]: number };
export type TweenData = TweenProps | number;

export type TweenContextType<T extends TweenData> = {
  state: T;
  controls: TweenControls;
};

export type TweenComponentProps = TweenProps & {
  duration?: number;
  ease?: Easing;
  easeParams?: string;
  state?: TweenState;
  time?: number;
  direction?: TweenDirection;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
  onAnimationInvert?: () => void;
  onAnimationIterate?: () => void;
};

export enum TweenEvent {
  AnimationStart,
  AnimationComplete,
  AnimationIterate,
  AnimationInvert
}
