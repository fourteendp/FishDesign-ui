/*
 * @Description:
 * @Date: 2022-07-01 10:29:26
 */
import { DefineComponent } from 'vue';
import _BaseRadioButton from './radio-button.vue';
import _BaseRadioGroup from './radio-group.vue';
import _BaseRadio from './radio.vue';

export type BaseRadioButtonProps = {
  modelValue?: any; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Radio 的尺寸
  name?: string; // 生 name 属性
  label?: string | number | boolean; // 	单选框对应的值
  disabled?: boolean; // 是否禁用单选框

  onChange?: (activeValue: any) => void;
};

export type BaseRadioGroupProps = {
  modelValue?: any; // 绑定值
  size?: 'large' | 'default' | 'small'; // 单选框组尺寸
  textColor?: string; // 按钮形式的 Radio 激活时的文本颜色
  fill?: string; // 按钮形式的 Radio 激活时的填充色和边框色
  disabled?: boolean; // 是否禁用
  /**
   * 选中前，执行done可以完成选中状态
   */
  checkBefore?: (activeValue: any, done: Function) => void;

  onChange?: (activeValue: any) => void;
};

export type BaseRadioProps = {
  modelValue?: any; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Radio 的尺寸
  name?: string; // 生 name 属性
  label?: string | number | boolean; // 	单选框对应的值
  disabled?: boolean; // 是否禁用单选框
  border?: boolean; // 是否显示边框
  /**
   * 选中前，执行done可以完成选中状态
   */
  checkBefore?: (activeValue: any, done: Function) => void;

  onChange?: (activeValue: any) => void;
};

export const BaseRadioButton =
  _BaseRadioButton as DefineComponent<BaseRadioButtonProps>;

export const BaseRadioGroup =
  _BaseRadioGroup as DefineComponent<BaseRadioGroupProps>;

export const BaseRadio = _BaseRadio as DefineComponent<BaseRadioProps>;
