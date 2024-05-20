import {RefObject, useEffect} from 'react';
import {Platform} from 'react-native';
import WebView from 'react-native-webview';

import {useInterval} from '../useInterval';

export function useAndroidWebViewFocus(
  webViewRef: RefObject<WebView>,
  enabled: boolean,
): void {
  const {start: startFocus, stop: stopFocus} = useInterval(() => {
    webViewRef.current?.requestFocus();
  }, 500);

  useEffect(() => {
    if (Platform.OS !== 'android' || !enabled) {
      return;
    }

    startFocus();

    return () => {
      stopFocus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);
}
