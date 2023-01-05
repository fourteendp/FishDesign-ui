<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:37
-->
<template>
  <el-radio-group
    class="base-radio-group"
    :model-value="modelValue"
    :size="size"
    :disabled="disabled"
    :text-color="textColor"
    :fill="fill"
    @change="handleChange"
  >
    <div style="display: inline-block" v-loading="_loading">
      <slot></slot>
    </div>
  </el-radio-group>
</template>

<script lang="tsx">
export default {
  name: 'base-radio-group'
};
</script>

<script lang="tsx" setup>
import { ref } from 'vue';
import { ElRadioGroup, vLoading as _vLoading } from 'element-plus';
import { isFunction } from '../../../tools/check';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const vLoading = _vLoading;
const props = defineProps<{
  modelValue?: any; // 绑定值
  size?: 'large' | 'default' | 'small'; // 单选框组尺寸
  textColor?: string; // 按钮形式的 Radio 激活时的文本颜色
  fill?: string; // 按钮形式的 Radio 激活时的填充色和边框色
  disabled?: boolean; // 是否禁用
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
    if (
      (props.modelValue?.length || 0) < activeValue?.length &&
      isFunction(props.checkBefore)
    ) {
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
.base-radio-group {
  ::v-deep {
    .fd-loading-spinner .circular {
      width: 20px;
    }
  }
}
</style>
