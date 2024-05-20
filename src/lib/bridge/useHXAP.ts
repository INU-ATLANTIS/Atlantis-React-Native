import {useEffect, useRef} from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';

import {WebViewPostEmitter} from './WebViewPostEmitter';
import {HXAPEvent, ReturningUseHXAP} from './types';
import {useHXAPHandler} from './useHXAPHandler';

export function useHXAP(): ReturningUseHXAP {
  const webViewRef = useRef<WebView>(null);
  const {handlerRef} = useHXAPHandler();
  const {current: handleMapping} = handlerRef;

  useEffect(() => {
    if (!webViewRef.current) {
      return;
    }

    const handlePostMessage = (event: HXAPEvent): void => {
      webViewRef?.current?.postMessage(JSON.stringify(event));
    };
    WebViewPostEmitter.addListener(handlePostMessage);

    return () => {
      WebViewPostEmitter.removeAllListener();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webViewRef.current]);

  const handleMessage = async (event: WebViewMessageEvent): Promise<void> => {
    const hxapEvent = JSON.parse(event?.nativeEvent?.data) as HXAPEvent;
    if (!hxapEvent) {
      return;
    }

    const target = handleMapping[hxapEvent.name];
    if (!target) {
      return;
    }
    const payload = JSON.parse(hxapEvent.payload || '{}');

    const result = await target.handler(hxapEvent.id, payload);
    if (result !== 'hxapWait') {
      const resultEvent: HXAPEvent = {
        ...result,
        name: target.eventName,
      };
      WebViewPostEmitter.emit(resultEvent);
    }
  };

  return {
    webViewRef,
    onMessage: handleMessage,
  };
}
