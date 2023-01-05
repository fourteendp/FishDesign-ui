/*
 * @Description:
 * @Date: 2022-07-01 11:19:18
 */
import { Component, DefineComponent } from 'vue';

import _BaseSwitch from './switch.vue';

export type BaseSwitchProps = {
  modelValue?: boolean | string | number;
  disabled?: boolean;
  loading?: boolean;
  size?: 'large' | 'default' | 'small';
  width?: number;
  activeIcon?: string | Component;
  activeText?: string;
  activeValue?: boolean | string | number;
  inactiveIcon?: string | Component;
  inactiveText?: string;
  inactiveValue?: boolean | string | number;
  beforeChange?: () => Promise<any> | boolean;

  onChange?: (value: boolean | string | number) => void;
};

export const BaseSwitch = _BaseSwitch as DefineComponent<BaseSwitchProps>;
