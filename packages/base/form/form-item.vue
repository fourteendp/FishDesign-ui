<!--
 * @Description: 
 * @Date: 2022-06-29 14:51:11
-->
<template>
  <el-form-item
    class="base-form-item"
    ref="BaseFormItem"
    :prop="prop"
    :label="label"
    :labelWidth="labelWidth"
    :required="required"
    :rules="rules"
    :error="error"
    :showMessage="showMessage"
    :inlineMessage="inlineMessage"
    :size="size"
  >
    <slot></slot>
  </el-form-item>
</template>

<script lang="tsx">
export default {
  name: 'base-form-item'
};
</script>
<script lang="tsx" setup>
import { ElFormItem, FormItemRule } from 'element-plus';
import { withDefaults, ref } from 'vue';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

withDefaults(
  defineProps<{
    prop: any; // model 的键名。 它可以是一个路径数组(例如 ['a', 'b', 0])。
    label?: string; // 标签文本
    labelWidth?: string | number | 'auto'; // 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto
    required?: boolean; // 是否为必填项，如不设置，则会根据校验规则确认
    rules?: any; // 表单验证规则
    error?: string; // 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。
    showMessage?: boolean; // 是否显示校验错误信息
    inlineMessage?: boolean; // 是否以行内形式展示校验信息
    size?: 'large' | 'default' | 'small'; // 用于控制该表单内组件的尺寸
  }>(),
  {
    labelWidth: 'auto',
    showMessage: true
  }
);

const BaseFormItem = ref<any>(null);

defineExpose({
  resetField: BaseFormItem.value?.resetField,
  clearValidate: BaseFormItem.value?.clearValidate
});
</script>

<style lang="scss" scoped>
.base-form-item {
  ::v-deep {
    .fd-form-item__label {
      font-weight: 700;
    }
  }
}
</style>
