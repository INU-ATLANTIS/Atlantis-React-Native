import AsyncStorage from '@react-native-async-storage/async-storage';

import {HXAPEventHandler, HXAPResult} from '../types';

interface RemoveDataPayload {
  key: string;
}

/**
 * ! 여기에선 wrapping된 lib/utils/storage를 사용하지 않습니다.
 */
export const removeDataHandler: HXAPEventHandler = {
  eventName: 'removeData',
  handler: async (
    id: string,
    payload: RemoveDataPayload,
  ): Promise<HXAPResult> => {
    await AsyncStorage.removeItem(payload.key);
    return {
      id,
    };
  },
};
