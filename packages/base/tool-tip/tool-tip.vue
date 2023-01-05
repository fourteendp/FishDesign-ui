<!--
 * @Description: 
 * @Date: 2022-06-30 23:31:05
-->
<!--
 * @Description:
 * @Date: 2022-06-28 11:06:06
-->
<template>
  <el-tooltip
    :key="_overShow ? '1' : '0'"
    :popper-class="popperClass"
    :trigger="trigger"
    :transition="transition"
    :disabled="_overShow || disabled"
    :placement="placement"
    :hideAfter="hideAfter"
    :enterable="enterable"
    :content="_content"
  >
    <template #content>
      <slot name="content"></slot>
    </template>
    <div
      v-if="trigger === 'hover' && overShow"
      style="width: 100%"
      :style="style"
      @mousemove="handleMouseMove"
      ref="toolTipDefault"
    >
      <span ref="toolTipDefaultContent">
        <slot></slot>
      </span>
    </div>
    <slot v-else></slot>
  </el-tooltip>
</template>

<script lang="tsx">
export default {
  name: 'base-tool-tip'
};
</script>

<script lang="tsx" setup>
import { ElTooltip } from 'element-plus';
import { computed, ref, StyleValue, withDefaults } from 'vue';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const props = withDefaults(
  defineProps<{
    popperClass?: string; // 弹出框的样式名，默认base-tool-tip（限制了最大宽度400）
    trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'; // 如何触发 tooltip (来显示)
    transition?: 'el-fade-in-linear' | 'none'; // 动画名称
    disabled?: boolean; // Tooltip 组件是否禁用
    enterable?: boolean; // 鼠标是否可进入到 tooltip 中
    hideAfter?: number; // 延迟关闭，单位毫秒
    placement?:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end'; // Tooltip 组件出现的位置
    content?: string | number; // 显示的内容，也可被 slot#content 覆盖

    style?: StyleValue | undefined;
    overShow?: boolean; // 内容超出才显示toolTip
  }>(),
  {
    trigger: 'hover',
    overShow: false,
    transition: 'el-fade-in-linear',
    enterable: true,
    hideAfter: 100,
    placement: 'top',
    popperClass: 'base-tool-tip'
  }
);

const _overShow = ref<boolean>(props.overShow);
const toolTipDefault = ref<HTMLElement | null>(null);
const toolTipDefaultContent = ref<HTMLElement | null>(null);

const _content = computed<string>(() => ('' + props.content) as string);

const handleMouseMove = () => {
  if (toolTipDefault.value?.tagName && toolTipDefaultContent.value?.tagName) {
    const { offsetWidth, offsetHeight } = toolTipDefault.value;
    const { offsetWidth: childOffsetWidth, offsetHeight: childOffsetHeight } =
      toolTipDefaultContent.value;

    _overShow.value = !(
      offsetWidth < childOffsetWidth || offsetHeight < childOffsetHeight
    );
  }
};
</script>

<style lang="scss">
.base-tool-tip {
  max-width: 400px;
}
</style>
