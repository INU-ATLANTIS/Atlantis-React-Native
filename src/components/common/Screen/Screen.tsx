import React from 'react';

import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import {ScreenProps} from './types';

export const Screen = ({
  safeAreaColor,
  barStyle,
  children,
  ...otherProps
}: ScreenProps): JSX.Element => {
  return (
    <>
      <StyledSafeAreaView
        {...otherProps}
        style={{
          backgroundColor: safeAreaColor ?? '#ffffff',
        }}>
        <StatusBar
          barStyle={barStyle ?? 'dark-content'}
          animated
          showHideTransition="fade"
        />
        <Container>{children}</Container>
      </StyledSafeAreaView>
    </>
  );
};

const StyledSafeAreaView = styled(SafeAreaView)`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
