/*
 * @Description:
 * @Date: 2022-06-29 15:58:37
 */

import { BaseDatePickerProps } from '../../../base/date-picker';
import { BaseInputProps } from '../../../base/input';
import { BaseSelectProps } from '../../../base/select';
import {
  SerachColumnType,
  SearchBtnType,
  ResetBtnType,
  SerachColumnBaseType,
  BaseInputListener,
  BaseSelectListener,
  BaseDatePickerListener,
  ComponentRender
} from '../types/type';

export const useInputColumn = (
  column: SerachColumnBaseType<BaseInputProps, BaseInputListener>
): SerachColumnBaseType<BaseInputProps, BaseInputListener> => {
  return {
    type: 'input',
    ...column,
    style: {
      width: '220px',
      ...(column.style || {})
    }
  };
};

export const useSelectColumn = (
  column: SerachColumnBaseType<BaseSelectProps, BaseSelectListener>
): SerachColumnBaseType<BaseSelectProps, BaseSelectListener> => {
  return {
    type: 'select',
    ...column,
    style: {
      width: '220px',
      ...(column.style || {})
    }
  };
};

export const useDatePickerColumn = (
  column: SerachColumnBaseType<BaseDatePickerProps, BaseDatePickerListener>
): SerachColumnBaseType<BaseDatePickerProps, BaseDatePickerListener> => {
  return {
    type: 'datePicker',
    ...column,
    style: {
      width: ['datetimerange', 'daterange', 'monthrange'].includes(
        column.config?.type || ''
      )
        ? '280px'
        : '220px',
      ...(column.style || {})
    }
  };
};

export const useSearchColumns = (
  columns: Array<SerachColumnType>
): Array<SerachColumnType> => {
  return columns.map(column => ({
    ...column,
    listener: column.listener || {},
    config: {
      clearable: true,
      ...(column.config || {})
    }
  }));
};

export const useSearchBtn = (searchBtnConfig: SearchBtnType) => {
  return {
    text: '搜索',
    show: true,
    ...searchBtnConfig
  };
};

export const useResetBtn = (resetBtnConfig: ResetBtnType) => {
  return {
    text: '重置',
    show: true,
    ...resetBtnConfig
  };
};

export const useOtherComponents = (
  otherComponents: Array<ComponentRender>
): Array<ComponentRender> => {
  return otherComponents;
};
