/*
 * @Description:
 * @Date: 2022-06-29 18:18:19
 */

import { DefineComponent } from 'vue';
import _BaseSelect from './select.vue';

export type SelectOptionType = {
  label: string;
  value?: string | number;
  disabled?: boolean;
  options?: Array<SelectOptionType>;
};
export type SelectValueType =
  | string
  | number
  | boolean
  | SelectOptionType
  | null
  | undefined;

export interface BaseSelectProps {
  /**
   * 初始化组件时 执行 remoteMethod 方法
   */
  init?: boolean;
  /**
   * 使用远程搜索
   */
  filterUseRemote?: boolean;
  /**
   * 下拉选项
   */
  options?: Array<SelectOptionType>;
  /**
   * 是否分组
   */
  group?: boolean;
  labelKey?: string;
  valueKey?: string;
  optionsKey?: string;

  /**
   * 选中项绑定值
   */
  modelValue?:
    | SelectValueType
    | Array<string | number | boolean | SelectOptionType | null | undefined>;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 输入框尺寸
   */
  size?: 'large' | 'default' | 'small';
  /**
   * 是否可以清空选项
   */
  clearable?: boolean;
  /**
   * 多选时是否将选中值按文字的形式展示
   */
  collapseTags?: boolean;
  /**
   * 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
   */
  collapseTagsTooltip?: boolean;
  /**
   * multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
   */
  multipleLimit?: number;
  /**
   * 占位文字
   */
  placeholder?: string;
  /**
   * Select 组件是否可筛选
   */
  filterable?: boolean;
  /**
   * 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。
   */
  allowCreate?: boolean;
  /**
   * 下拉框的宽度是否与输入框相同
   */
  fitInputWidth?: boolean;
  /**
   * 自定义筛选方法
   */
  filterMethod?: (searchVal: string) => Array<SelectValueType>;
  /**
   * 远程方法
   */
  remoteMethod?: (searchVal?: string) => any;
  /**
   * 从服务器加载内容时显示的文本
   */
  loadingText?: string;
  /**
   * 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置
   */
  noMatchText?: string;
  /**
   * 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容
   */
  noDataText?: string;

  onChange?: (
    value: SelectValueType,
    SelectOption: Array<SelectOptionType>
  ) => void;
  onRemoveTag?: (value: SelectValueType) => void;
  onVisibleChange?: (visibleStatus: boolean) => void;
  onClear?: () => void;
}

export const BaseSelect = _BaseSelect as DefineComponent<BaseSelectProps>;
