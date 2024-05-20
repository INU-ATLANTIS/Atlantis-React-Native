import {WebViewPostEmitter} from './WebViewPostEmitter';
import {HXAPEvent, HXAPWait} from './types';

export const HXAPPromise = {
  wait: (): HXAPWait => 'hxapWait',
  resolve: (result: HXAPEvent) => WebViewPostEmitter.emit(result),
};
