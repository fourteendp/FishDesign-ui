/*
 * @Description:
 * @Date: 2022-07-04 17:18:12
 */
import { DefineComponent } from 'vue';

import _fdTable from './table.vue';
import { fdTableProps } from './types/type';

export type fdTableRef = {
  /**
   * 获取当前表格选择的所有数据
   */
  getSelectionRows: () => any[];
  /**
   * 当前表格增加选中项
   */
  addSelectionRow: (rowId: string | number, row: any) => void;
  /**
   * 移除当前表格指定选中项
   */
  removeSelectionRow: (rowId: string | number) => void;
  /**
   * 移除当前表格所有选中项
   */
  clearSelectionRows: () => void;

  /**
   * 设置指定搜索项
   */
  setSearchValue: (key: string | number, value: any) => void;
  /**
   * 获取搜索组件所有搜索项
   */
  getSearchValue: () => Record<string, any>;

  /**
   * 刷新当前页，可传入自定义参数（只会作用与这次列表获取，相同变量会被search组件设置的值覆盖）
   */
  initCurrentList: (customQuery?: Record<string, any>) => void;
  /**
   * 回到第一页，并刷新列表，可传入自定义参数（只会作用与这次列表获取，相同变量会被search组件设置的值覆盖）
   */
  initList: (customQuery?: Record<string, any>) => void;
};

export const fdTable = _fdTable as DefineComponent<fdTableProps>;
