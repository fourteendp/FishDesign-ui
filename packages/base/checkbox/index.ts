/*
 * @Description:
 * @Date: 2022-07-01 10:29:26
 */
import { DefineComponent } from 'vue';
import _BaseCheckboxButton from './checkbox-button.vue';
import _BaseCheckboxGroup from './checkbox-group.vue';
import _BaseCheckbox from './checkbox.vue';

export type BaseCheckboxButtonProps = {
  modelValue?: string | number | boolean; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Checkbox 的尺寸
  name?: string; // 原生 name 属性
  label?: string | number | boolean; // 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）
  disabled?: boolean; // 	是否禁用
  border?: boolean; // 	是否显示边框
  trueLabel?: string | number; // 选中时的值
  falseLabel?: string | number; // 没有选中时的值
  checked?: boolean; // 当前是否勾选

  onChange?: (activeValue: any) => void;
  onClick?: (payload?: MouseEvent) => void;
};

export type BaseCheckboxGroupProps = {
  modelValue?: Array<any>; // 绑定值
  size?: 'large' | 'default' | 'small'; // 多选框组尺寸
  disabled?: boolean; // 是否禁用
  textColor?: string; // 当按钮为活跃状态时的字体颜色
  fill?: string; // 当按钮为活跃状态时的边框和背景颜色
  label?: string; // 为屏幕阅读器准备的标签
  min?: number; // 可被勾选的 checkbox 的最小数量
  max?: number; // 可被勾选的 checkbox 的最大数量
  checkBefore?: (activeValue: any, done: Function) => void;

  onChange?: (activeValue: any) => void;
};

export type BaseCheckboxProps = {
  modelValue?: string | number | boolean; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Checkbox 的尺寸
  name?: string; // 原生 name 属性
  label?: string | number | boolean; // 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）
  disabled?: boolean; // 	是否禁用
  border?: boolean; // 	是否显示边框
  trueLabel?: string | number; // 选中时的值
  falseLabel?: string | number; // 没有选中时的值
  checked?: boolean; // 当前是否勾选
  indeterminate?: boolean; // 设置 indeterminate 状态，只负责样式控制
  checkBefore?: (activeValue: any, done: Function) => void;

  onChange?: (activeValue: any) => void;
  onClick?: (payload?: MouseEvent) => void;
};

export const BaseCheckboxButton =
  _BaseCheckboxButton as DefineComponent<BaseCheckboxButtonProps>;

export const BaseCheckboxGroup =
  _BaseCheckboxGroup as DefineComponent<BaseCheckboxGroupProps>;

export const BaseCheckbox = _BaseCheckbox as DefineComponent<BaseCheckboxProps>;
