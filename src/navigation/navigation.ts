import {NavigationContainerRef} from '@react-navigation/native';
import {createRef} from 'react';

import {NavigateFuncArguments, RouteScreen} from './types';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export function navigate<T extends RouteScreen = RouteScreen>(
  ...args: NavigateFuncArguments<T>
): void {
  const [screen, params] = args;
  navigationRef.current?.navigate(screen as RouteScreen, params);
}

export function goBack(): void {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
}

export function canGoback(): boolean {
  return navigationRef.current?.canGoBack() ?? false;
}
