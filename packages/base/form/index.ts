/*
 * @Description:
 * @Date: 2022-07-01 11:09:32
 */
import { FormItemRule, FormRules } from 'element-plus';

import _BaseForm from './form.vue';
import _BaseFormItem from './form-item.vue';
import { DefineComponent } from 'vue';

export type BaseFormProps = {
  model: Record<string, any>; // 表单数据对象
  rules?: FormRules; // 表单验证规则
  inline?: boolean; // 	行内表单模式
  labelPosition?: 'left' | 'right' | 'top'; // 表单域标签的位置， 当设置为 left 或 right 时，则也需要设置 label-width 属性
  labelWidth?: string | number | 'auto'; // 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto
  labelSuffix?: string; // 表单域标签的后缀
  hideRequiredAsterisk?: boolean; // 是否显示必填字段的标签旁边的红色星号
  showMessage?: boolean; // 是否显示校验错误信息
  inlineMessage?: boolean; // 是否以行内形式展示校验信息
  statusIcon?: boolean; // 是否在输入框中显示校验结果反馈图标
  validateOnRuleChange?: boolean; // 是否在 rules 属性改变后立即触发一次验证
  size?: 'large' | 'default' | 'small'; // 用于控制该表单内组件的尺寸
  disabled?: boolean; // 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
};
export type BaseFormItemProps = {
  prop: string | Array<string>; // model 的键名。 它可以是一个路径数组(例如 ['a', 'b', 0])。
  label?: string; // 标签文本
  labelWidth?: string | number | 'auto'; // 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto
  required?: boolean; // 是否为必填项，如不设置，则会根据校验规则确认
  rules?: FormItemRule | Array<FormItemRule>; // 表单验证规则
  error?: string; // 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。
  showMessage?: boolean; // 是否显示校验错误信息
  inlineMessage?: boolean; // 是否以行内形式展示校验信息
  size?: 'large' | 'default' | 'small'; // 用于控制该表单内组件的尺寸
};

export const BaseFormItem = _BaseFormItem as DefineComponent<BaseFormItemProps>;
export const BaseForm = _BaseForm as DefineComponent<BaseFormProps>;
