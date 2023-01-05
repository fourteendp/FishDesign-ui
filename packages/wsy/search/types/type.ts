/*
 * @Description:
 * @Date: 2022-06-29 16:09:25
 */
import { Component, CSSProperties } from 'vue';
import { BaseInputProps } from '../../../base/input';
import { BaseDatePickerProps } from '../../../base/date-picker';
import {
  BaseSelectProps,
  SelectOptionType,
  SelectValueType
} from '../../../base/select';
import { FormItemRule } from 'element-plus';

type AnyObject = Record<string, any>;

export type BaseSelectListener = {
  /**
   * 下拉选值
   */
  onChange?: (
    value: SelectValueType,
    selectOptions: Array<SelectOptionType>,
    searchValue: AnyObject
  ) => void;
  onRemoveTag?: (value: SelectValueType, searchValue: AnyObject) => void;
  /**
   * 下拉框显示/隐藏时
   */
  onVisibleChange?: (visibleStatus: boolean, searchValue: AnyObject) => void;
  /**
   * 清除时候
   */
  onClear?: (searchValue: AnyObject) => void;
};

export type BaseInputListener = {
  onBlur?: (events: Event, searchValue: AnyObject) => void;
  onFocus?: (events: Event, searchValue: AnyObject) => void;
  onKeyup?: (events: Event, searchValue: AnyObject) => void;
  onChange?: (
    value: string | number | KeyboardEvent,
    searchValue: AnyObject
  ) => void;
  onInput?: (
    value: string | number | KeyboardEvent,
    searchValue: AnyObject
  ) => void;
  onClear?: (searchValue: AnyObject) => void;
};

export type BaseDatePickerListener = {
  /**
   * 选择时间
   */
  onChange?: (value: any, searchValue: AnyObject) => void;
  /**
   * 下拉框显示/隐藏时
   */
  onVisibleChange?: (visibleStatus: boolean, searchValue: AnyObject) => void;
  /**
   * 范围选择，选择了第一个时间
   */
  onCalendarChange?: (val: [Date, Date | null], searchValue: AnyObject) => void;
};

export interface ComponentsType {
  input: Component;
  select: Component;
  datePicker: Component;
}

export type SerachColumnBaseType<T, S> = {
  prop: string;
  type?: keyof ComponentsType;
  label?: string;
  style?: CSSProperties;
  defaultValue?: any;
  rules?: FormItemRule | Array<FormItemRule>;
  /**
   * 是否禁用
   */
  disabled?: boolean | ((searchValue: AnyObject) => Promise<boolean> | boolean);
  config?: T;
  listener?: S;
};

export type SerachColumnType = SerachColumnBaseType<
  BaseInputProps | BaseSelectProps | BaseDatePickerProps,
  BaseInputListener | BaseSelectListener | BaseDatePickerListener
>;

/**
 * 搜索按钮配置
 * 点击时，执行顺序 beforeSearch -> emit.search -> afterSearch
 */
export type SearchBtnType = {
  text?: string;
  show?: boolean;
  /**
   * 搜索前
   */
  beforeSearch?: (searchValue: AnyObject) => AnyObject | Promise<AnyObject>;
  /**
   * 搜索后
   */
  afterSearch?: (
    searchValue: AnyObject
  ) => void | AnyObject | Promise<AnyObject>;
};

/**
 * 重置按钮配置
 * 点击时，执行顺序  清空组件内的值 -> beforeReset -> emit.search -> afterReset
 */
export type ResetBtnType = {
  text?: string;
  show?: boolean;
  /**
   * 重置前
   */
  beforeReset?: (searchValue: AnyObject) => AnyObject | Promise<AnyObject>;
  /**
   * 重置后
   */
  afterReset?: (
    searchValue: AnyObject
  ) => void | AnyObject | Promise<AnyObject>;
};

export interface ComponentRender {
  render: (renderInfo: {
    columns: Array<SerachColumnType>;
    searchValue: Record<string, any>;
  }) => Component;
}
