import {WebViewPostEmitter} from '../WebViewPostEmitter';
import {HXAPEventHandler} from '../types';

export const mountHandler: HXAPEventHandler = {
  eventName: 'mount',
  handler: (id: string) => {
    WebViewPostEmitter.mount();

    return {
      id,
    };
  },
};
