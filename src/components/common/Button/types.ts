import {ReactNode} from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  TouchableHighlightProps,
} from 'react-native';

export type ButtonSemantic = 'primary' | 'secondary' | 'neutral' | 'negative';
export type ButtonVariant = 'fill' | 'line' | 'text' | 'icon';
export type ButtonSize = 'large' | 'medium' | 'small' | 'xsmall';
export type ButtonShape = 'square' | 'round';

export interface ButtonProps extends TouchableHighlightProps {
  textColor?: ColorValue;
  semantic?: ButtonSemantic;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  children?: string | ReactNode;
}

export type ReturningUseButton<T extends ButtonProps = ButtonProps> = T & {
  buttonProps: Required<
    Pick<
      ButtonProps,
      | 'semantic'
      | 'variant'
      | 'size'
      | 'shape'
      | 'disabled'
      | 'loading'
      | 'fullWidth'
    >
  >;
  onPress: (event: GestureResponderEvent) => void;
};
