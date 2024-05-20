import React from 'react';
import styled from 'styled-components/native';

import {Screen} from '../components/common/Screen';
import {WebView} from '../components/common/WebView';
import {useHXAP} from '../lib/bridge';

const MainScreen = (): JSX.Element => {
  const {webViewRef, onMessage} = useHXAP();

  return (
    <Screen>
      <StyledWebView
        ref={webViewRef}
        source={{uri: 'http://43.201.36.163:3000/'}}
        iosOptions={{
          bounces: false,
          allowsLinkPreview: false,
          keyboardDisplayRequiresUserAction: false,
          sharedCookiesEnabled: true,
          useSharedProcessPool: true,
        }}
        androidOptions={{
          cacheMode: 'LOAD_NO_CACHE',
          domStorageEnabled: true,
          geolocationEnabled: true,
          thirdPartyCookiesEnabled: true,
          textZoom: 100,
        }}
        onLoadEnd={() => webViewRef.current?.requestFocus()}
        cacheEnabled={false}
        javaScriptEnabled
        webviewDebuggingEnabled
        javaScriptCanOpenWindowsAutomatically
        originWhitelist={['*']}
        focusable
        onMessage={onMessage}
      />
    </Screen>
  );
};

export default MainScreen;

const StyledWebView = styled(WebView)`
  width: 100%;
  height: 100%;

  display: flex;
`;
