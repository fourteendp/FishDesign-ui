<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:37
-->
<template>
  <el-checkbox-group
    class="base-checkbox-group"
    :model-value="modelValue"
    :size="size"
    :disabled="disabled"
    :text-color="textColor"
    :fill="fill"
    :label="label"
    :min="min"
    :max="max"
    @change="handleChange"
  >
    <div style="display: inline-block" v-loading="_loading">
      <slot></slot>
    </div>
  </el-checkbox-group>
</template>

<script lang="tsx">
export default {
  name: 'base-checkbox-group'
};
</script>

<script lang="tsx" setup>
import { ref } from 'vue';
import { ElCheckboxGroup, vLoading as _vLoading } from 'element-plus';
import { isFunction } from '../../../tools/check';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const vLoading = _vLoading;
const props = defineProps<{
  modelValue?: Array<any>; // 绑定值
  size?: 'large' | 'default' | 'small'; // 多选框组尺寸
  disabled?: boolean; // 是否禁用
  textColor?: string; // 当按钮为活跃状态时的字体颜色
  fill?: string; // 当按钮为活跃状态时的边框和背景颜色
  label?: string; // 为屏幕阅读器准备的标签
  min?: number; // 可被勾选的 checkbox 的最小数量
  max?: number; // 可被勾选的 checkbox 的最大数量

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
.base-checkbox-group {
  ::v-deep {
    .fd-loading-spinner .circular {
      width: 20px;
    }
  }
}
</style>
