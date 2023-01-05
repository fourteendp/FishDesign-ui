<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:37
-->
<template>
  <el-checkbox-button
    :model-value="modelValue"
    :size="size"
    :name="name"
    :label="label"
    :disabled="disabled"
    :border="border"
    :true-label="trueLabel"
    :false-label="falseLabel"
    :checked="checked"
    @change="handleChange"
  >
    <slot></slot>
  </el-checkbox-button>
</template>

<script lang="tsx">
export default {
  name: 'base-checkbox-button'
};
</script>

<script lang="tsx" setup>
import { ElCheckboxButton } from 'element-plus';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

defineProps<{
  modelValue?: string | number | boolean; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Checkbox 的尺寸
  name?: string; // 原生 name 属性
  label?: string | number | boolean; // 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）
  disabled?: boolean; // 	是否禁用
  border?: boolean; // 	是否显示边框
  trueLabel?: string | number; // 选中时的值
  falseLabel?: string | number; // 没有选中时的值
  checked?: boolean; // 当前是否勾选
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
