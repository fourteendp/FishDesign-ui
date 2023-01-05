<!--
 * @Description: 
 * @Date: 2022-06-21 11:14:09
-->
<template>
  <el-button
    @click="handleClick"
    :loading="isLoading"
    :size="size"
    :type="type"
    :plain="plain"
    :round="round"
    :circle="circle"
    :disabled="disabled"
    :autofocus="autofocus"
    :autoInsertSpace="autoInsertSpace"
    :nativeType="nativeType"
    :loadingIcon="loadingIcon"
    :icon="icon"
  >
    <slot></slot>
  </el-button>
</template>

<script lang="tsx">
export default {
  name: 'base-button'
};
</script>

<script lang="tsx" setup>
import { Component, computed, ref } from 'vue';
import { ElButton } from 'element-plus';
import { BaseButtonProps } from './index';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const _props = withDefaults(
  defineProps<{
    click?: any; // 自定义方法 ， 用于事件同步执行
    loading?: boolean; // 是否为加载中状态
    loadingIcon?: any; // 自定义加载中状态图标组件
    size?: 'large' | 'default' | 'small'; // 尺寸
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
    plain?: boolean; // 是否为朴素按钮
    round?: boolean; // 是否为圆角按钮
    circle?: boolean; // 是否为圆形按钮
    disabled?: boolean; // 按钮是否为禁用状态
    autofocus?: boolean; // 原生 autofocus 属性
    autoInsertSpace?: boolean; // 自动在两个中文字符之间插入空格
    nativeType?: 'button' | 'submit' | 'reset'; // 原生 type 属性
    icon?: any; // 图标组件
  }>(),
  {
    type: 'primary',
    size: 'default'
  }
);

const props = _props as Readonly<BaseButtonProps>;

const { handleClick, isLoading } = (() => {
  const _loading = ref<boolean>(false);
  const isLoading = computed(() => {
    return props.loading || _loading.value;
  });
  return {
    isLoading: isLoading,
    handleClick: (props.click
      ? async () => {
          _loading.value = true;
          try {
            await props.click?.();
            _loading.value = false;
          } catch (error) {
            console.warn(error);
            _loading.value = false;
          }
        }
      : void 0) as ((evt: MouseEvent) => any) | undefined
  };
})();
</script>

<style lang="scss" scoped></style>
