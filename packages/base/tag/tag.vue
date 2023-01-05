<!--
 * @Description: 
 * @Date: 2022-06-28 14:48:20
-->
<template>
  <el-tag
    :type="type"
    :closable="closable"
    :disableTransitions="disableTransitions"
    :hit="hit"
    :color="color"
    :size="size"
    :effect="effect"
    :round="round"
    @click="emits('click')"
    @close="emits('close')"
  >
    <slot></slot>
  </el-tag>
</template>

<script lang="tsx">
export default {
  name: 'base-tag'
};
</script>

<script lang="tsx" setup>
import { ElTag } from 'element-plus';
import { withDefaults } from 'vue';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

withDefaults(
  defineProps<{
    type?: 'success' | 'info' | 'warning' | 'danger';
    closable?: boolean;
    disableTransitions?: boolean;
    hit?: boolean;
    color?: string;
    size?: 'large' | 'default' | 'small';
    effect?: 'dark' | 'light' | 'plain';
    round?: boolean;
  }>(),
  {
    size: 'large'
  }
);

const emits = defineEmits<{
  (event: 'click', tag?: any): void;
  (event: 'close', tag?: any): void;
}>();
</script>

<style lang="scss" scoped></style>
