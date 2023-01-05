<!--
 * @Description: 
 * @Date: 2022-06-29 14:51:11
-->
<template>
  <el-form
    ref="BaseForm"
    :model="model"
    :rules="rules"
    :inline="inline"
    :labelPosition="labelPosition"
    :labelWidth="labelWidth"
    :labelSuffix="labelSuffix"
    :hideRequiredAsterisk="hideRequiredAsterisk"
    :showMessage="showMessage"
    :inlineMessage="inlineMessage"
    :statusIcon="statusIcon"
    :validateOnRuleChange="validateOnRuleChange"
    :size="size"
    :disabled="disabled"
  >
    <slot></slot>
  </el-form>
</template>

<script lang="tsx">
export default {
  name: 'base-form'
};
</script>
<script lang="tsx" setup>
import { ElForm, FormRules } from 'element-plus';
import { withDefaults, ref } from 'vue';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

withDefaults(
  defineProps<{
    model: any; // 表单数据对象
    rules?: any; // 表单验证规则
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
  }>(),
  {
    labelPosition: 'left',
    labelWidth: 'auto',
    showMessage: true,
    validateOnRuleChange: true
  }
);

const BaseForm = ref<any>(null);

defineExpose({
  validate: (...args: any) => BaseForm.value?.validate(...args),
  validateField: (...args: any) => BaseForm.value?.validateField(...args),
  resetFields: (...args: any) => BaseForm.value?.resetFields(...args),
  scrollToField: (...args: any) => BaseForm.value?.scrollToField(...args),
  clearValidate: (...args: any) => BaseForm.value?.clearValidate(...args)
});
</script>

<style lang="scss" scoped></style>
