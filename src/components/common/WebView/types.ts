import type {
  WebViewSharedProps,
  AndroidWebViewProps as BaseAndroidWebViewProps,
  IOSWebViewProps as BaseIOSWebViewProps,
} from 'react-native-webview/src/WebViewTypes';

export type AndroidWebViewProps = Partial<
  UniqueProps<BaseAndroidWebViewProps, WebViewSharedProps>
> & {
  enableAutoFocus?: boolean;
};
export type IOSWebViewProps = Partial<
  UniqueProps<BaseIOSWebViewProps, WebViewSharedProps>
>;

export interface WebViewProps extends WebViewSharedProps {
  iosOptions: IOSWebViewProps;
  androidOptions: AndroidWebViewProps;
}
