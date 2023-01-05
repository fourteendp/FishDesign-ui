<!--
 * @Description: 
 * @Date: 2022-06-28 13:56:17
-->
<template>
  <el-switch
    class="base-switch"
    v-model="_switchValue"
    :disabled="disabled"
    :loading="_loading"
    :size="size"
    :width="width"
    :activeIcon="activeIcon"
    :activeText="activeText"
    :activeValue="activeValue"
    :inactiveIcon="inactiveIcon"
    :inactiveText="inactiveText"
    :inactiveValue="inactiveValue"
    :beforeChange="_beforeChange"
    @change="handleChange"
  ></el-switch>
</template>

<script lang="tsx">
export default {
  name: 'base-switch'
};
</script>

<script lang="tsx" setup>
import { ElSwitch } from 'element-plus';
import { withDefaults, Component, ref, watch } from 'vue';
import { isFunction } from '../../../tools/check';
import { BaseSwitchProps } from '.';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const _props = withDefaults(
  defineProps<{
    modelValue?: boolean | string | number;
    disabled?: boolean;
    loading?: boolean;
    size?: 'large' | 'default' | 'small';
    width?: number;
    activeIcon?: any;
    activeText?: string;
    activeValue?: boolean | string | number;
    inactiveIcon?: any;
    inactiveText?: string;
    inactiveValue?: boolean | string | number;
    beforeChange?: () => Promise<any> | boolean;
  }>(),
  {
    activeValue: true,
    inactiveValue: false
  }
);

const props = _props as Readonly<BaseSwitchProps>;

const emits = defineEmits<{
  (event: 'update:modelValue', value: typeof props.modelValue): void;
  (event: 'change', value: typeof props.modelValue): void;
}>();

const _loading = ref<boolean | undefined>(props.loading);

const _switchValue = ref<typeof props.modelValue>(props.modelValue);
// 父组件值发生改变时，同步_switchValue
watch(
  () => props.modelValue,
  newV => {
    _switchValue.value = newV;
  }
);
const _beforeChange = (async () => {
  try {
    _loading.value = true;
    if (isFunction(props.beforeChange)) {
      await props.beforeChange?.();
    }
    _loading.value = false;
    return true;
  } catch (error) {
    console.error('switch change fail', error);
    _loading.value = false;
    return false;
  }
}) as typeof props.beforeChange;

const handleChange = (val: typeof props.modelValue) => {
  _switchValue.value = val;
  emits('update:modelValue', val);
  emits('change', val);
};
</script>

<style lang="scss" scoped>
.base-switch {
  ::v-deep {
    .el-icon {
      z-index: 1;
    }
  }
}
</style>
