/*
 * @Description:
 * @Date: 2022-06-30 22:57:42
 */
import { Component, DefineComponent } from 'vue';
import _BaseButton from './button.vue';

export type BaseButtonProps = {
  /**
   * 自定义方法 ， 用于事件同步执行,使用这个的时候，可以不用使用 @click onClick
   */
  click?: (...preload: Array<any>) => Promise<any> | void | any;
  loading?: boolean; // 是否为加载中状态
  loadingIcon?: string | Component; // 自定义加载中状态图标组件
  size?: 'large' | 'default' | 'small'; // 尺寸
  type?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'text'
    | 'link';
  plain?: boolean; // 是否为朴素按钮
  round?: boolean; // 是否为圆角按钮
  circle?: boolean; // 是否为圆形按钮
  disabled?: boolean; // 按钮是否为禁用状态
  autofocus?: boolean; // 原生 autofocus 属性
  autoInsertSpace?: boolean; // 自动在两个中文字符之间插入空格
  nativeType?: 'button' | 'submit' | 'reset'; // 原生 type 属性
  icon?: string | Component; // 图标组件

  onClick?: Function;
};

export const BaseButton = _BaseButton as DefineComponent<BaseButtonProps>;
