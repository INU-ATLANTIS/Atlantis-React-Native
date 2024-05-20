import {useNavigation as useNavigationBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {NavigationParams} from '../types';

export function useNavigation(): NativeStackNavigationProp<NavigationParams> {
  return useNavigationBase<NativeStackNavigationProp<NavigationParams>>();
}
