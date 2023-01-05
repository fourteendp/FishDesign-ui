/*
 * @Description:
 * @Date: 2022-07-06 19:44:55
 */
import { StyleValue, DefineComponent } from 'vue';
import _BaseToolTip from './tool-tip.vue';

export type BaseToolTipProps = {
  popperClass?: string; // 弹出框的样式名，默认base-tool-tip（限制了最大宽度400）
  trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'; // 如何触发 tooltip (来显示)
  transition?: 'el-fade-in-linear' | 'none'; // 动画名称
  disabled?: boolean; // Tooltip 组件是否禁用
  enterable?: boolean; // 鼠标是否可进入到 tooltip 中
  hideAfter?: number; // 延迟关闭，单位毫秒
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'; // Tooltip 组件出现的位置
  content?: string | number; // 显示的内容，也可被 slot#content 覆盖

  style?: StyleValue | undefined;
  /**
   * trigger = hover 时有效
   * 内容超出才显示toolTip , 默认内容不超出也会触发展示
   */
  overShow?: boolean;
};

export const BaseToolTip = _BaseToolTip as DefineComponent<BaseToolTipProps>;
