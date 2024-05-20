import {RuleSet} from 'styled-components';
import {css} from 'styled-components/native';

import {ButtonSize, ButtonSemantic} from './types';

export const semanticMapper: Record<ButtonSemantic, string> = {
  primary: '#fede00',
  secondary: '#333333',
  negative: '#e82729',
  neutral: '#EEEEEE',
};

export const sizeMapper: Record<ButtonSize, RuleSet> = {
  large: css`
    height: 48px;
  `,
  medium: css`
    height: 40px;
  `,
  small: css`
    height: 32px;
  `,
  xsmall: css`
    height: 26px;
  `,
};

export const contentPaddingMapper: Record<ButtonSize, RuleSet> = {
  large: css`
    padding: 0 24px;
  `,
  medium: css`
    padding: 0 20px;
  `,
  small: css`
    padding: 0 12px;
  `,
  xsmall: css`
    padding: 0 10px;
  `,
};

export const squareRadiusMapper: Record<ButtonSize, RuleSet> = {
  large: css`
    border-radius: 12px;
  `,
  medium: css`
    border-radius: 10px;
  `,
  small: css`
    border-radius: 8px;
  `,
  xsmall: css`
    border-radius: 4px;
  `,
};

export const contentMapper: Record<ButtonSize, RuleSet> = {
  large: css`
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: -0.4px;
  `,
  medium: css`
    font-size: 15px;
    font-weight: 500;
    line-height: 18.75px;
    letter-spacing: -0.4px;
  `,
  small: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 17.5px;
    letter-spacing: -0.4px;
  `,
  xsmall: css`
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: -0.3px;
  `,
};
