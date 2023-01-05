/*
 * @Description:
 * @Date: 2022-07-01 14:34:57
 */
import { Component, CSSProperties, DefineComponent } from 'vue';

import _BaseTable from './table.vue';
import _BaseTableColumn from './table-column.vue';
import { BaseTableColumnProps, BaseTableProps } from './types/type';
import { useTableColumn as _useTableColumn } from './hooks/use-table';

export const BaseTable = _BaseTable as DefineComponent<BaseTableProps>;
export const BaseTableColumn =
  _BaseTableColumn as DefineComponent<BaseTableColumnProps>;

export const useTableColumn = _useTableColumn;
