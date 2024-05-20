import {DeviceEventEmitter} from 'react-native';

export class CustomEventListener<T> {
  private _eventName: string;

  constructor(eventName: string) {
    this._eventName = eventName;
  }

  public emit(payload: T): void {
    DeviceEventEmitter.emit(this._eventName, payload);
  }

  public addListener(callback: (payload: T) => void): void {
    DeviceEventEmitter.addListener(this._eventName, callback);
  }

  public removeAllListener(): void {
    DeviceEventEmitter.removeAllListeners(this._eventName);
  }
}
