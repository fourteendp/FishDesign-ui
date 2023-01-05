<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:37
-->
<template>
  <el-checkbox
    class="base-checkbox"
    :model-value="modelValue"
    :size="size"
    :name="name"
    :label="label"
    :disabled="disabled"
    :border="border"
    :true-label="trueLabel"
    :false-label="falseLabel"
    :checked="checked"
    :indeterminate="indeterminate"
    v-loading="_loading"
    @change="handleChange"
  >
    <slot></slot>
  </el-checkbox>
</template>

<script lang="tsx">
export default {
  name: 'base-checkbox'
};
</script>

<script lang="tsx" setup>
import { ref } from 'vue';
import { ElCheckbox, vLoading as _vLoading } from 'element-plus';
import { isFunction } from '../../../tools/check';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const vLoading = _vLoading;
const props = defineProps<{
  modelValue?: string | number | boolean; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Checkbox 的尺寸
  name?: string; // 原生 name 属性
  label?: string | number | boolean; // 选中状态的值（只有在checkbox-group或者绑定对象类型为array时有效）
  disabled?: boolean; // 	是否禁用
  border?: boolean; // 	是否显示边框
  trueLabel?: string | number; // 选中时的值
  falseLabel?: string | number; // 没有选中时的值
  checked?: boolean; // 当前是否勾选
  indeterminate?: boolean; // 设置 indeterminate 状态，只负责样式控制

  checkBefore?: (activeValue: any, done: Function) => void;
}>();

const emits = defineEmits<{
  (event: 'change', activeValue: any): void;
  (event: 'update:modelValue', activeValue: any): void;
}>();

const _loading = ref(false);

const handleChange = async (activeValue: any) => {
  if (_loading.value) return;
  _loading.value = true;
  try {
    if (activeValue && isFunction(props.checkBefore)) {
      await props.checkBefore(activeValue, () => {
        emits('update:modelValue', activeValue);
        emits('change', activeValue);
      });
    } else {
      emits('update:modelValue', activeValue);
      emits('change', activeValue);
    }
  } catch (error) {}
  _loading.value = false;
};
</script>

<style lang="scss" scoped>
.base-checkbox {
  ::v-deep {
    .fd-loading-spinner .circular {
      width: 20px;
    }
  }
}
</style>
