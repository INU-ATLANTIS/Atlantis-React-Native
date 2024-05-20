import {MutableRefObject, RefObject} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

export interface HXAPEvent {
  id: string;
  name: string;
  payload?: string | null;
}

export interface HXAPResult {
  id: string;
  payload?: string | null;
}

export type HXAPWait = 'hxapWait';

export interface HXAPEventHandler<T = any> {
  eventName: string;
  handler: (
    id: string,
    payload: T,
  ) => HXAPResult | Promise<HXAPResult> | HXAPWait | Promise<HXAPWait>;
}

export interface ReturningUseHXAPHandler {
  handlerRef: MutableRefObject<Record<string, HXAPEventHandler>>;
}

export interface ReturningUseHXAP {
  webViewRef: RefObject<WebView>;
  onMessage: (event: WebViewMessageEvent) => Promise<void>;
}

export interface HXAPNotificationEvent {
  tag: string;
  param: string;
}
