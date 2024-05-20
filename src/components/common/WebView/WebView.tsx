import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import BaseWebView from 'react-native-webview';
import type {
  WebViewErrorEvent,
  WebViewSharedProps,
  WebViewTerminatedEvent,
} from 'react-native-webview/src/WebViewTypes';

import {useAndroidWebViewFocus} from '../../../hooks/react-native/useAndroidWebViewFocus';

import {AndroidWebViewProps, IOSWebViewProps, WebViewProps} from './types';

const defaultSharedProps: WebViewSharedProps = {
  cacheEnabled: false,
  javaScriptEnabled: true,
  javaScriptCanOpenWindowsAutomatically: true,
  originWhitelist: ['*'],
  focusable: true,
};

const defaultIOSProps: IOSWebViewProps = {
  sharedCookiesEnabled: true,
};

const defaultAndroidProps: AndroidWebViewProps = {
  cacheMode: 'LOAD_NO_CACHE',
  domStorageEnabled: true,
  mixedContentMode: 'compatibility',
  geolocationEnabled: true,
  thirdPartyCookiesEnabled: true,
  enableAutoFocus: true,
  textZoom: 100,
};

export const WebView = forwardRef<BaseWebView, WebViewProps>(
  ({iosOptions, androidOptions, ...otherProps}, ref): JSX.Element => {
    const webViewRef = useRef<BaseWebView>(null);
    const errorCountRef = useRef<number>(0);

    useImperativeHandle(ref, () => webViewRef.current as BaseWebView);
    useAndroidWebViewFocus(
      webViewRef,
      androidOptions.enableAutoFocus ??
        defaultAndroidProps.enableAutoFocus ??
        false,
    );

    const handleError = (event: WebViewErrorEvent): void => {
      console.warn(event.nativeEvent);
      if (errorCountRef.current < 3) {
        errorCountRef.current += 1;
        webViewRef.current?.reload();
      }
    };

    const handleContentProcessDidTerminate = (
      event: WebViewTerminatedEvent,
    ): void => {
      console.warn(event.nativeEvent);
      webViewRef.current?.reload();
    };

    return (
      <BaseWebView
        ref={webViewRef}
        onError={handleError}
        onContentProcessDidTerminate={handleContentProcessDidTerminate}
        {...defaultSharedProps}
        {...defaultIOSProps}
        {...defaultAndroidProps}
        {...otherProps}
        {...iosOptions}
        {...androidOptions}
      />
    );
  },
);
