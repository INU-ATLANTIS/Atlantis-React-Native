import {navigate} from '../../../navigation/navigation';

import {HXAPEventHandler, HXAPResult} from '../types';

export const showGeofencingHandler: HXAPEventHandler = {
  eventName: 'showGeofencing',
  handler: (id: string): HXAPResult => {
    navigate('Geofencing');
    return {
      id,
    };
  },
};
