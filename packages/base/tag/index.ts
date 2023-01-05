/*
 * @Description:
 * @Date: 2022-07-04 09:41:35
 */
import { DefineComponent } from 'vue';
import _BaseTagGroup from './tag-group.vue';
import _BaseTag from './tag.vue';

export type TagOption = {
  label: string | number;
  value: string | number;
  closable?: boolean;
};

export type BaseTagGroupProps = {
  modelValue?: Array<TagOption>;
  labelKey?: string;
  type?: 'success' | 'info' | 'warning' | 'danger';
  disableTransitions?: boolean;
  hit?: boolean;
  color?: string;
  size?: 'large' | 'default' | 'small';
  effect?: 'dark' | 'light' | 'plain';
  round?: boolean;

  beforeClose?: (val: TagOption) => Promise<void>;
  beforeAdd?: (val: string) => TagOption | Promise<TagOption>;
  showAdd?: boolean;
  addBtnText?: string;
  maxlength?: number;

  onChange?: (tags: Array<TagOption>) => void;
  onClick?: (tag: TagOption) => void;
};

export type BaseTagProps = {
  type?: 'success' | 'info' | 'warning' | 'danger';
  closable?: boolean;
  disableTransitions?: boolean;
  hit?: boolean;
  color?: string;
  size?: 'large' | 'default' | 'small';
  effect?: 'dark' | 'light' | 'plain';
  round?: boolean;

  onClick?: (tag: TagOption) => void;
  onClose?: (tag: TagOption) => void;
};

export const BaseTag = _BaseTag as DefineComponent<BaseTagProps>;

export const BaseTagGroup = _BaseTagGroup as DefineComponent<BaseTagGroupProps>;
