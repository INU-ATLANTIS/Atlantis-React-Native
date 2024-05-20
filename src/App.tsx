import React from 'react';

import {LogBox} from 'react-native';

import {StackNavigator} from './navigation';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = ({isHeadless}: RNAppProps): JSX.Element | null => {
  // react-native가 background에서 실행되는 경우
  // 예) 앱이 켜지지 않은 상황에서 push 알림이 발생하는 경우
  if (isHeadless) {
    return null;
  }

  return <StackNavigator />;
};

export default App;
