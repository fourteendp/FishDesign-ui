<!--
 * @Description: 
 * @Date: 2022-07-05 10:11:16
-->
<template>
  <el-dialog
    :custom-class="`${customClass} ${showFooter ? '' : 'hide-footer'}`"
    :modelValue="show"
    :closeOnClickModal="closeOnClickModal"
    :closeOnPressEscape="closeOnPressEscape"
    :appendToBody="appendToBody"
    :destroyOnClose="destroyOnClose"
    :center="center"
    :width="width"
    ref="fdDialog"
    :showClose="showClose"
    :before-close="hanldeBeforeClose"
    @closed="handleClosed"
  >
    <template v-slot:header>
      <base-dialog-render
        v-if="titleRender"
        :render="titleRender"
      ></base-dialog-render>
      <span v-else-if="title">{{ title }}</span>
      <template v-else>
        <slot name="header"></slot>
      </template>
    </template>

    <base-dialog-render
      v-if="contentRender"
      :render="contentRender"
    ></base-dialog-render>
    <div v-else-if="content">{{ content }}</div>
    <template v-else>
      <slot></slot>
    </template>

    <template v-slot:footer>
      <base-dialog-render
        v-if="footerRender"
        :render="footerRender"
      ></base-dialog-render>
      <div v-else-if="showFooter">
        <base-button
          v-if="cancelBtnConfig.show"
          size="large"
          v-bind="cancelBtnConfig"
          :click="handleCancelClick"
        >
          {{ cancelBtnConfig.content }}
        </base-button>
        <base-button
          v-if="confirmBtnConfig.show"
          size="large"
          v-bind="confirmBtnConfig"
          :click="handleConfirmClick"
        >
          {{ confirmBtnConfig.content }}
        </base-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="tsx">
export default {
  name: 'base-dialog'
};
</script>
<script lang="tsx" setup>
import { ElDialog } from 'element-plus';
import { BaseButton } from '../button';
import { Component, computed, defineComponent, ref, watch } from 'vue';
import { check } from 'xrk-tools';
import { BaseDialogProps } from './index';
import { isFunction } from '../../../tools/check';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const _props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
    appendToBody?: boolean;
    destroyOnClose?: boolean;
    center?: boolean;
    showClose?: boolean;
    beforeClose?: (done: Function) => Promise<void> | void;
    beforeCancel?: (done: Function) => Promise<void> | void;
    beforeConfirm?: (done: Function) => Promise<void> | void;

    customClass?: string;
    width?: string | number;
    title?: string;
    content?: string | number;
    showFooter?: boolean;
    titleRender?: (done: Function) => Component;
    contentRender?: (done: Function) => Component;
    footerRender?: (done: Function) => Component;

    confirmBtnConfig?: any;
    cancelBtnConfig?: any;
  }>(),
  {
    title: '提示',
    width: '50%',
    customClass: '_base-dialog',
    modelValue: true,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    destroyOnClose: true,
    appendToBody: true,
    showClose: false,
    showFooter: true,
    center: true,
    cancelBtnConfig: () => ({ show: true, content: '取消', plain: true }),
    confirmBtnConfig: () => ({ show: true, content: '确定' })
  }
);

const props = _props as Readonly<BaseDialogProps>;

const emits = defineEmits<{
  (event: 'update:modelValue', activeValue: any): void;
  (event: 'close'): void;
}>();

const show = ref<boolean>(props.modelValue || false);
watch(
  () => props.modelValue,
  newV => {
    show.value = newV || false;
  }
);

const BaseDialogRender = defineComponent({
  name: 'dialog-render',
  props: {
    render: Function
  },
  render: (ctx: { render: Function }) => {
    return ctx.render
      ? ctx.render(() =>
          hanldeBeforeClose(() => {
            show.value = false;
          })
        )
      : '';
  }
});

const hanldeBeforeClose = async (done: Function) => {
  if (isFunction(props.beforeClose)) {
    await props.beforeClose(done);
  } else {
    done();
  }
  emits('close');
};

const handleClosed = () => {
  emits('update:modelValue', !props.modelValue);
};

const handleCancelClick = async () => {
  if (isFunction(props.beforeCancel)) {
    await props.beforeCancel(() => {
      show.value = false;
    });
  } else {
    show.value = false;
  }
  emits('close');
};

const handleConfirmClick = async () => {
  if (isFunction(props.beforeConfirm)) {
    await props.beforeConfirm(() => {
      show.value = false;
    });
  } else {
    show.value = false;
  }
  emits('close');
};
</script>

<style lang="scss">
.el-popup-parent--hidden {
  overflow: hidden;
}
._base-dialog {
  --fd-dialog-border-radius: 4px !important;
  max-height: 80vh;
  overflow: hidden;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  .fd-dialog__header {
    font-size: 20px;
    color: #303133;
    line-height: 1.4;
    margin-right: 0;
  }
  .fd-dialog__body {
    height: 100%;
    overflow-y: auto;
    padding: 25px var(--fd-dialog-padding-primary) !important;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #0003;
      border-radius: 10px;
      transition: all 0.2s ease-in-out;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }
  &.hide-footer {
    .fd-dialog__footer {
      display: none !important;
    }
  }
}
</style>
