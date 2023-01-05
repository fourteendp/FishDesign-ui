/*
 * @Description:
 * @Date: 2022-06-30 22:57:42
 */
import { Component, CSSProperties, DefineComponent } from 'vue';
import _BaseInput from './input.vue';

export interface BaseInputProps {
  modelValue?: string | number; // 选中项绑定值
  type?: 'text' | 'textarea' | 'password' | 'number'; // 类型
  maxlength?: string | number; // 最大输入长度
  minlength?: string | number; // 原生属性，最小输入长度
  showWordLimit?: boolean; // 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
  placeholder?: string; // 输入框占位文本
  clearable?: boolean; // 是否可清空
  formatter?: (value: string | number) => string; // 指定输入值的格式。(只有当 type 是"text"时才能工作)
  parser?: (value: string) => string; // 指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)
  showPassword?: boolean; // 是否显示切换密码图标
  disabled?: boolean; // 是否禁用
  size?: 'large' | 'default' | 'small'; // 输入框尺寸，只在 type 不为 'textarea' 时有效
  prefixIcon?: string | Component; // 自定义前缀图标
  suffixIcon?: string | Component; // 自定义后缀图标
  rows?: number; // 输入框行数，仅 type 为 'textarea' 时有效
  autosize?: boolean | { minRows?: number; maxRows?: number }; // textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }
  autocomplete?: string; // 原生 autocomplete 属性
  name?: string; // 等价于原生 input name 属性
  readonly?: boolean; // 原生  readonly 属性，是否只读
  max?: number; // 原生 max 属性，设置最大值
  min?: number; // 原生属性，设置最小值
  step?: number; // 原生属性，设置输入字段的合法数字间隔
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'; // 控制是否能被用户缩放
  autofocus?: boolean; // 原生属性，自动获取焦点
  form?: string; // 原生属性
  label?: string; // 标签文本
  tabindex?: string | number; // 输入框的 tabindex
  validateEvent?: boolean; // 输入时是否触发表单的校验
  inputStyle?: CSSProperties; // input 元素或 textarea 元素的 style

  /**
   * 输入时处理输入值
   */
  inputRewrite?: (value: string | number) => string | Promise<string>;
  /**
   * 发生改变时处理输入值
   */
  changeRewrite?: (value: string | number) => string | Promise<string>;

  onBlur?: (events: Event) => void;
  onFocus?: (events: Event) => void;
  onKeyup?: (events: Event) => void;
  onChange?: (value?: string | number | KeyboardEvent) => void;
  onInput?: (value?: string | number | KeyboardEvent) => void;
  onClear?: () => void;
}

export const BaseInput = _BaseInput as DefineComponent<BaseInputProps>;
