/*
 * @Description:
 * @Date: 2022-07-05 10:17:03
 */
import { Component, DefineComponent, h, render } from 'vue';
import { BaseButtonProps } from '../button';
import _BaseDialog from './dialog.vue';

export type BaseDialogProps = {
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

  confirmBtnConfig?: DialogBtnConfigProps;
  cancelBtnConfig?: DialogBtnConfigProps;

  onClose?: () => Promise<void> | void;
};

export interface DialogBtnConfigProps extends BaseButtonProps {
  show?: boolean;
  content?: string;
}

export const BaseDialog = _BaseDialog as DefineComponent<BaseDialogProps>;

export const createDialog = (config?: BaseDialogProps) => {
  const container = document.createElement('div');
  const customDialogCount =
    document.querySelectorAll('._fd_create_dialog').length;
  container.classList.add('_fd_create_dialog');
  container.style.position = 'relative';
  container.style.zIndex = `${200 + customDialogCount}`;
  render(
    h(_BaseDialog, {
      modelValue: true,
      ...(config || {}),
      appendToBody: false,
      onClose: async () => {
        await config?.onClose?.();
        document.querySelector('body')?.removeChild(container);
      }
    }),
    container
  );
  document.querySelector('body')?.appendChild(container);
};
