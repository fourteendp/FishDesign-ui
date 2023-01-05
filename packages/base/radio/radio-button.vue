<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:37
-->
<template>
  <el-radio-button
    :model-value="modelValue"
    :disabled="disabled"
    :name="name"
    :label="label"
    :size="size"
    @change="handleChange"
  >
    <slot></slot>
  </el-radio-button>
</template>

<script lang="tsx">
export default {
  name: 'base-radio-button'
};
</script>

<script lang="tsx" setup>
import { ElRadioButton } from 'element-plus';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

defineProps<{
  modelValue?: any; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Radio 的尺寸
  name?: string; // 生 name 属性
  label?: string | number | boolean; // 	单选框对应的值
  disabled?: boolean; // 是否禁用单选框
}>();

const emits = defineEmits<{
  (event: 'change', activeValue: any): void;
  (event: 'update:modelValue', activeValue: any): void;
}>();

const handleChange = (activeValue: any) => {
  emits('update:modelValue', activeValue);
  emits('change', activeValue);
};
</script>

<style lang="scss" scoped></style>
