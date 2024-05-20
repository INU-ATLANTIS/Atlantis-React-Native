import React from 'react';
import {css} from 'styled-components';
import styled from 'styled-components/native';

import {TopMenuProps} from './types';

export const TopMenu = ({
  backgroundColor = '#FFFFFF',
  children,
}: TopMenuProps): JSX.Element => {
  return <Container backgroundColor={backgroundColor}>{children}</Container>;
};

type ContainerStyleProps = Omit<TopMenuProps, 'children'>;

const Container = styled.View<ContainerStyleProps>`
  padding: 4px;

  display: flex;
  align-items: center;
  z-index: 999;

  ${({backgroundColor}) => css`
    background-color: ${backgroundColor};

    width: 100%;
    height: 48px;

    flex-direction: row;
  `}
`;
