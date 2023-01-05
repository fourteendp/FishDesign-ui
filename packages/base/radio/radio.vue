<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:37
-->
<template>
  <el-radio
    class="base-radio"
    :model-value="modelValue"
    :size="size"
    :name="name"
    :label="label"
    :disabled="disabled"
    :border="border"
    @change="handleChange"
  >
    <slot></slot>
  </el-radio>
</template>

<script lang="tsx">
export default {
  name: 'base-radio'
};
</script>

<script lang="tsx" setup>
import { ref } from 'vue';
import { ElRadio } from 'element-plus';
import { isFunction } from '../../../tools/check';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const props = defineProps<{
  modelValue?: any; // 选中项绑定值
  size?: 'large' | 'default' | 'small'; // Radio 的尺寸
  name?: string; // 生 name 属性
  label?: string | number | boolean; // 	单选框对应的值
  disabled?: boolean; // 是否禁用单选框
  border?: boolean; // 是否显示边框

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
.base-radio {
  ::v-deep {
    .fd-loading-spinner .circular {
      width: 20px;
    }
  }
}
</style>
