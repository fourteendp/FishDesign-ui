<!--
 * @Description: 
 * @Date: 2022-06-28 14:58:39
-->
<template>
  <div class="base-tag-group">
    <base-tag
      class="base-tag"
      v-for="(item, index) in modelValue"
      :key="index"
      :type="type"
      :closable="item['closable']"
      :disableTransitions="disableTransitions"
      :hit="hit"
      :color="color"
      :size="size"
      :effect="effect"
      :round="round"
      v-loading="closeIndex == index"
      @close="handleTagClose(index)"
      @click="handleTagClick(index)"
    >
      {{ _Reflect.get(item, labelKey) }}
    </base-tag>
    <template v-if="showAdd">
      <base-input
        v-if="inputVisible"
        class="base-input"
        clearable
        :disabled="adding"
        ref="InputRef"
        v-model="inputValue"
        :size="size"
        :maxlength="maxlength"
        v-loading="adding"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <base-button v-else :size="size" @click="showInput" :disabled="adding">
        {{ addBtnText }}
      </base-button>
    </template>
  </div>
</template>

<script lang="tsx">
export default {
  name: 'base-tag-group'
};
</script>
<script lang="tsx" setup>
import { BaseInput } from '../input';
import { BaseButton } from '../button';
import BaseTag from './tag.vue';
import { withDefaults, ref, nextTick } from 'vue';
import { isFunction } from '../../../tools/check';
import { check } from 'xrk-tools';
import { BaseTagGroupProps, TagOption } from './index';
import { vLoading as _vLoading } from 'element-plus';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const vLoading = _vLoading;
const _Reflect = Reflect;

const _props = withDefaults(
  defineProps<{
    modelValue?: Array<any>;
    labelKey?: string;
    type?: 'success' | 'info' | 'warning' | 'danger';
    disableTransitions?: boolean;
    hit?: boolean;
    color?: string;
    size?: 'large' | 'default' | 'small';
    effect?: 'dark' | 'light' | 'plain';
    round?: boolean;

    beforeClose?: any;
    beforeAdd?: (val: any) => any;
    showAdd?: boolean;
    addBtnText?: string;
    maxlength?: number;
  }>(),
  { labelKey: 'label', showAdd: false, maxlength: 20, addBtnText: '新增' }
);

const props = _props as Readonly<BaseTagGroupProps>;

const emits = defineEmits<{
  (event: 'update:modelValue', tags: any): void;
  (event: 'change', tags: any): void;
  (event: 'click', tag: any): void;
}>();

const tagsValue = ref<any>(props.modelValue);
const closeIndex = ref<number>(-1);
const adding = ref<boolean>(false);

const handleTagClose = async (index: number) => {
  if (closeIndex.value > -1) return;
  try {
    closeIndex.value = index;
    if (isFunction(props.beforeClose)) {
      await props.beforeClose?.(tagsValue.value?.[index] as TagOption);
    }
    tagsValue.value?.splice(index, 1);
    emits('update:modelValue', tagsValue.value);
    emits('change', tagsValue.value);
    closeIndex.value = -1;
  } catch (error) {
    console.error(error);
    closeIndex.value = -1;
  }
};
const handleTagClick = (index: number) => {
  emits('click', tagsValue.value?.[index] as TagOption);
};

/**
 * 增加标签逻辑
 */
const InputRef = ref<any>(null);
const inputVisible = ref<boolean>(false);
const inputValue = ref<string>('');
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value.focus();
  });
};
const handleInputConfirm = async () => {
  if (adding.value) {
    return;
  }
  if (check.isFalseValue(inputValue.value)) {
    inputVisible.value = false;
    return;
  }
  try {
    adding.value = true;
    const _value = (
      isFunction(props.beforeAdd)
        ? await props.beforeAdd?.(inputValue.value)
        : { label: inputValue.value, value: inputValue.value, closable: true }
    ) as TagOption;
    tagsValue.value?.push(_value);
    emits('update:modelValue', tagsValue.value);
    emits('change', tagsValue.value);
    inputVisible.value = false;
    adding.value = false;
    inputValue.value = '';
  } catch (error) {
    adding.value = false;
    inputVisible.value = false;
    inputValue.value = '';
  }
};
</script>

<style lang="scss" scoped>
.base-tag-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .base-tag {
    margin-right: 5px;
    margin-bottom: 3px;
    margin-top: 3px;
    ::v-deep {
      .fd-loading-spinner .circular {
        width: 20px;
      }
    }
  }
  .base-input {
    width: 150px;
    ::v-deep {
      .fd-loading-spinner .circular {
        width: 20px;
      }
    }
  }
}
</style>
