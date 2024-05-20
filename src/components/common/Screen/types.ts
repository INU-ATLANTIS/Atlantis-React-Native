import {ReactNode} from 'react';
import {ColorValue, StatusBarStyle} from 'react-native';
import {NativeSafeAreaViewProps} from 'react-native-safe-area-context';

export interface ScreenProps extends NativeSafeAreaViewProps {
  safeAreaColor?: ColorValue;
  barStyle?: StatusBarStyle;
  children?: ReactNode;
}
