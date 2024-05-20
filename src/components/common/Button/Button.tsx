import React from 'react';
import {ForwardRefExoticComponent, RefAttributes, forwardRef} from 'react';
import {ActivityIndicator, ColorValue, TouchableHighlight} from 'react-native';
import styled, {css} from 'styled-components/native';

import {
  contentMapper,
  contentPaddingMapper,
  semanticMapper,
  sizeMapper,
  squareRadiusMapper,
} from './styleMapper';
import {ButtonProps} from './types';
import {useButton} from './useButton';

export const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<TouchableHighlight>
> = forwardRef<TouchableHighlight, ButtonProps>((props, ref): JSX.Element => {
  const {
    variant,
    buttonProps,
    left,
    right,
    textColor,
    children,
    ...otherProps
  } = useButton(props);

  return (
    <StyledTouchable
      ref={ref}
      {...buttonProps}
      {...otherProps}
      underlayColor={variant !== 'fill' ? '#0000001c' : '#000000'}>
      <StyledButton {...buttonProps}>
        {buttonProps.loading ? (
          <ActivityIndicator
            size="small"
            color={buttonProps.semantic === 'secondary' ? '#FFFFFF' : '#212121'}
          />
        ) : (
          <>
            {left}
            {typeof children === 'string' ? (
              <ButtonText textColor={textColor} {...buttonProps}>
                {children}
              </ButtonText>
            ) : (
              children
            )}
            {right}
          </>
        )}
      </StyledButton>
    </StyledTouchable>
  );
});

type StyledTouchableStyleProps = Required<
  Pick<ButtonProps, 'shape' | 'size' | 'fullWidth'>
>;
const StyledTouchable = styled(TouchableHighlight)<StyledTouchableStyleProps>`
  display: flex;

  ${({shape, size, fullWidth}) => css`
    ${fullWidth &&
    css`
      flex-grow: 1;
    `}

    ${shape === 'square' && squareRadiusMapper[size]};
    ${shape === 'round' &&
    css`
      border-radius: 9999px;
    `}
  `};
`;

type StyledButtonStyleProps = Required<
  Pick<ButtonProps, 'semantic' | 'variant' | 'size' | 'shape' | 'disabled'>
>;
const StyledButton = styled.View<StyledButtonStyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;

  ${({semantic, variant, shape, size, disabled}) => css`
    ${variant === 'fill' &&
    css`
      background-color: ${semanticMapper[semantic]};
    `}

    ${variant === 'line' &&
    css`
      background-color: transparent;
      border: 1px solid ${semanticMapper[semantic]};
    `}

    ${variant === 'text' &&
    css`
      background-color: transparent;
    `}

    ${shape === 'square' && squareRadiusMapper[size]};
    ${shape === 'round' &&
    css`
      border-radius: 9999px;
    `}

    ${sizeMapper[size]};
    ${variant === 'icon'
      ? css`
          padding: 8px;
          background-color: transparent;
        `
      : css`
          ${contentPaddingMapper[size]};
        `}

    ${disabled &&
    css`
      opacity: 0.3;
    `}
  `}
`;

type ButtonTextStyleProps = Required<Pick<ButtonProps, 'semantic' | 'size'>> & {
  textColor?: ColorValue;
};
const ButtonText = styled.Text<ButtonTextStyleProps>`
  ${({semantic, size, textColor}) => css`
    color: #212121;
    ${(semantic === 'secondary' || semantic === 'negative') &&
    css`
      color: #ffffff;
    `}
    ${textColor &&
    css`
      color: ${textColor.toString()};
    `}
    ${contentMapper[size]};
  `}
`;
