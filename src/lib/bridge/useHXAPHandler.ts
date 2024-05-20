import {useEffect, useRef} from 'react';

import {loadDataHandler} from './handlers/loadData.handler';
import {removeDataHandler} from './handlers/removeData.handler';
import {saveDataHandler} from './handlers/saveData.handler';
import {mountHandler} from './handlers/mount.handler';
import {showGeofencingHandler} from './handlers/showGeofencing.handler';
import {HXAPEventHandler, ReturningUseHXAPHandler} from './types';

export function useHXAPHandler(): ReturningUseHXAPHandler {
  const handlerRef = useRef<Record<string, HXAPEventHandler>>({});

  const register = (handler: HXAPEventHandler): void => {
    handlerRef.current[handler.eventName] = handler;
  };

  useEffect(() => {
    register(loadDataHandler);
    register(removeDataHandler);
    register(saveDataHandler);
    register(mountHandler);
    register(showGeofencingHandler);
  }, []);

  return {
    handlerRef,
  };
}
