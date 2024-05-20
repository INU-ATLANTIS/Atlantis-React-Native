import {CustomEventListener} from '../utils/react-native/CustomEventListener';

import {HXAPEvent} from './types';

class RNWebViewPostEmitter extends CustomEventListener<HXAPEvent> {
  private _deferredEventQueue: HXAPEvent[];
  private _mount: boolean;

  constructor() {
    super('hxapPostMessage');
    this._deferredEventQueue = [];
    this._mount = false;
  }

  public mount(): void {
    this._mount = true;

    this._deferredEventQueue.forEach(event => this.emit(event));
    this._deferredEventQueue = [];
  }

  public emit(event: HXAPEvent): void {
    if (!this._mount) {
      this._deferredEventQueue.push(event);
      return;
    }
    super.emit(event);
  }
}

export const WebViewPostEmitter = new RNWebViewPostEmitter();
