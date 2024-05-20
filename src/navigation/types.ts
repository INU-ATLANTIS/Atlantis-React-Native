export type ViewResultResolver<T = any> = (data: T) => void;

export interface ViewResultResolverParams<T> {
  viewResultResolver: ViewResultResolver<T>;
}

export type NavigationParams = {
  Main: undefined;
  Geofencing: undefined;
};

export type RouteScreen = keyof NavigationParams;
export type NavigateFuncArguments<T extends RouteScreen = RouteScreen> =
  NavigationParams[T] extends undefined
    ? [screen: T]
    : [screen: T, params: NavigationParams[T]];
