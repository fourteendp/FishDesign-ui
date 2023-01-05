/*
 * @Description:
 * @Date: 2022-07-05 13:42:48
 */
import { DefineComponent } from 'vue';

import _fdSearch from './search.vue';
import {
  ComponentRender,
  ResetBtnType,
  SearchBtnType,
  SerachColumnType
} from './types/type';

export type fdSearchProps = {
  columns: Array<SerachColumnType>;
  searchBtn?: SearchBtnType;
  resetBtn?: ResetBtnType;
  otherComponents?: Array<ComponentRender>;
};

export type fdSearchRef = {
  /**
   * 设置指定搜索项
   */
  setSearchValue: (key: string | number, value: any) => void;
  /**
   * 获取搜索组件所有搜索项
   */
  getSearchValue: () => Record<string, any>;

  /**
   * 执行等同于点击搜索按钮
   */
  handleSearchClick: () => void | Promise<void>;
  /**
   * 执行等同于点击重置按钮
   */
  handleResetClick: () => void | Promise<void>;
};

export const fdSearch = _fdSearch as DefineComponent<fdSearchProps>;
