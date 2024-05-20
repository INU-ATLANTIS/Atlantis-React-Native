import {useRoute} from '@react-navigation/native';

import {NavigationParams, RouteScreen} from '../types';

type ReturningUseNavigateParam<T extends RouteScreen = RouteScreen> =
  NavigationParams[T] extends undefined ? never : NavigationParams[T];

export function useNavigateParams<T extends RouteScreen = RouteScreen>(
  _screen: T,
): ReturningUseNavigateParam<T> {
  const route = useRoute<any>();
  return route.params;
}
