/*
 * @Description:
 * @Date: 2022-06-29 19:10:13
 */
import { Component, DefineComponent } from 'vue';
import _BaseDatePicker from './date-picker.vue';

export type BaseDatePickerProps = {
  modelValue?: string | Date | Array<Date | string>; // 选中项绑定值
  readonly?: boolean; // 只读
  disabled?: boolean; // 禁用
  size?: 'large' | 'default' | 'small'; // 输入框尺寸
  editable?: boolean; // 文本框可输入
  clearable?: boolean; // 是否显示清除按钮
  placeholder?: string; // 非范围选择时的占位内容
  startPlaceholder?: string; // 范围选择时开始日期的占位内容
  endPlaceholder?: string; // 范围选择时结束日期的占位内容
  type?:
    | 'year'
    | 'month'
    | 'date'
    | 'dates'
    | 'datetime'
    | 'week'
    | 'datetimerange'
    | 'daterange'
    | 'monthrange'; // 显示类型
  format?: string; // 显示在输入框中的格式
  popperClass?: string; // DatePicker 下拉框的类名
  rangeSeparator?: string; // 选择范围时的分隔符
  defaultValue?: Date; // 可选，选择器打开时默认显示的时间
  defaultTime?: Array<Date>; // 范围选择时选中日期所使用的当日内具体时刻
  valueFormat?: string; // 可选，绑定值的格式。 不指定则绑定值为 Date 对象
  unlinkPanels?: boolean; // 在范围选择器里取消两个日期面板之间的联动
  prefixIcon?: string | Component; // 自定义前缀图标
  clearIcon?: string | Component; // 自定义清除图标
  validateEvent?: boolean; // 输入时是否触发表单的校验
  /**
   * 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
   */
  disabledDate?: (date: Date, startDt: Date | null) => boolean;
  /**
   * 设置快捷选项，需要传入数组对象
   */
  shortcuts?: Array<{
    text: string;
    value: Date | (() => void);
  }>;
  cellClassName?: (date: Date) => string; // 设置自定义类名
  teleported?: boolean; // 是否将 date-picker 的下拉列表插入至 body 元素

  onChange?: (activeValue: any) => void;
  onVisibleChange?: (visibility: boolean) => void;
  onCalendarChange?: (val: [Date, Date | null]) => void;
};

export const BaseDatePicker =
  _BaseDatePicker as DefineComponent<BaseDatePickerProps>;
