import AsyncStorage from '@react-native-async-storage/async-storage';

import {HXAPEventHandler, HXAPResult} from '../types';

interface LoadDataPayload {
  key: string;
}

/**
 * ! 여기에선 wrapping된 lib/utils/storage를 사용하지 않습니다.
 */
export const loadDataHandler: HXAPEventHandler = {
  eventName: 'loadData',
  handler: async (
    id: string,
    payload: LoadDataPayload,
  ): Promise<HXAPResult> => {
    const value = await AsyncStorage.getItem(payload.key);
    return {
      id,
      payload: value,
    };
  },
};
