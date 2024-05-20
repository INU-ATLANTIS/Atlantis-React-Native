import {useEffect, useRef} from 'react';

interface ReturningUseInterval {
  start: () => void;
  stop: () => void;
}

/**
 * # useInterval
 *
 * @description
 * setInterval을 쉽게 사용할 수 있도록 해주는 hook
 *
 * @example
 * ```tsx
 * const { start, stop } = useInterval()
 * ```
 */
export function useInterval(
  callback: () => void,
  ms: number,
): ReturningUseInterval {
  const intervalRef = useRef<number | NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      intervalRef.current && stop();
    };
  }, [ms]);

  const start = (): void => {
    if (intervalRef.current) {
      stop();
    }
    intervalRef.current = setInterval(() => callbackRef.current(), ms);
  };

  const stop = (): void => {
    clearInterval(intervalRef.current);
  };

  return {
    start,
    stop,
  };
}
