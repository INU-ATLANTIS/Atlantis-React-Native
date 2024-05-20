import {GestureResponderEvent} from 'react-native';

import {ButtonProps, ReturningUseButton} from './types';

export function useButton<T extends ButtonProps = ButtonProps>(
  props: T,
): ReturningUseButton {
  const skipPressEvent = props.disabled || props.loading;
  const onPress = (event: GestureResponderEvent): void => {
    if (skipPressEvent) {
      return;
    }

    props.onPress && props.onPress(event);
  };

  return {
    ...props,
    buttonProps: {
      fullWidth: props.fullWidth ?? false,
      semantic: props.semantic ?? 'primary',
      variant: props.variant ?? 'fill',
      size: props.size ?? 'medium',
      shape: props.shape ?? 'square',
      disabled: props.disabled ?? false,
      loading: props.loading ?? false,
    },
    onPress,
  };
}
