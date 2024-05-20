import AsyncStorage from '@react-native-async-storage/async-storage';

import {HXAPEventHandler, HXAPResult} from '../types';

interface SaveDataPayload {
  key: string;
  value: string;
}

/**
 * ! 여기에선 wrapping된 lib/utils/storage를 사용하지 않습니다.
 */
export const saveDataHandler: HXAPEventHandler = {
  eventName: 'saveData',
  handler: async (
    id: string,
    payload: SaveDataPayload,
  ): Promise<HXAPResult> => {
    await AsyncStorage.setItem(payload.key, payload.value);
    return {
      id,
    };
  },
};
