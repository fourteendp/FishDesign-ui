<!--
 * @Description: 
 * @Date: 2022-06-29 14:48:27
-->
<template>
  <div class="fd-search">
    <base-form @submit.native.prevent :model="searchValue">
      <base-form-item
        v-for="{
          style,
          label,
          prop,
          type,
          disabled,
          config,
          listener
        } in columns"
        :prop="prop"
        :label="label"
        :key="prop"
      >
        <component
          v-if="type"
          :style="style"
          :is="components[type]"
          v-bind="{ ...config, ...proxyColumnListener(listener || {}) }"
          :disabled="isFunction(disabled) ? disabled(searchValue) : disabled"
          v-model="searchValue[prop]"
        ></component>
      </base-form-item>
      <base-button v-if="searchBtn.show" :click="handleSearchClick">
        {{ searchBtn.text }}
      </base-button>
      <base-button v-if="resetBtn.show" :plain="true" :click="handleResetClick">
        {{ resetBtn.text }}
      </base-button>
      <base-search-render
        :render="render"
        v-for="({ render }, index) in otherComponents"
        :key="index"
      ></base-search-render>
    </base-form>
  </div>
</template>

<script lang="tsx">
export default {
  name: 'fd-search'
};
</script>

<script lang="tsx" setup>
import BaseForm from '../../base/form/form.vue';
import BaseFormItem from '../../base/form/form-item.vue';
import BaseButton from '../../base/button/button.vue';
import BaseInput from '../../base/input/input.vue';
import BaseSelect from '../../base/select/select.vue';
import BaseDatePicker from '../../base/date-picker/date-picker.vue';

import {
  ComponentsType,
  SerachColumnType,
  SearchBtnType,
  ResetBtnType,
  ComponentRender
} from './types/type';

import { ref, withDefaults, reactive, shallowRef, defineComponent } from 'vue';
import { base, check } from 'xrk-tools';
import { isFunction } from '../../../tools/check';

const components = ref<ComponentsType>({
  input: shallowRef(BaseInput),
  select: shallowRef(BaseSelect),
  datePicker: shallowRef(BaseDatePicker)
});

const _props = withDefaults(
  defineProps<{
    columns: any;
    searchBtn?: any;
    resetBtn?: any;
    otherComponents?: any;
  }>(),
  {
    searchBtn: () => ({
      text: '搜索',
      show: true
    }),
    resetBtn: () => ({
      text: '重置',
      show: true
    })
  }
);

const props = _props as Readonly<{
  columns: Array<SerachColumnType>;
  searchBtn?: SearchBtnType | undefined;
  resetBtn?: ResetBtnType | undefined;
  otherComponents?: ComponentRender[] | undefined;
}>;

const emits = defineEmits<{
  (event: 'search', searchValue: Record<string, any>): void;
}>();

const columnsToSearchValue = (columns: typeof props.columns) => {
  return columns.reduce((pre: Record<string, any>, { prop, defaultValue }) => {
    pre[prop] = defaultValue || '';
    return pre;
  }, {});
};

// 将 searchValue 传入 每个搜索项的监听事件
const proxyColumnListener = (listener: Record<string, Function>) => {
  return Object.keys(listener).reduce((pre: Record<string, Function>, cur) => {
    pre[cur] = (...args: any) => {
      listener[cur](...args, searchValue);
    };
    return pre;
  }, {});
};

const searchValue = reactive<Record<string, any>>(
  columnsToSearchValue(props.columns)
);

const BaseSearchRender = defineComponent({
  name: 'search-render',
  props: {
    render: Function
  },
  render: (ctx: { render: ComponentRender['render'] }) => {
    return ctx.render
      ? ctx.render({ columns: props.columns, searchValue })
      : '';
  }
});

const handleSearchClick = async () => {
  let _searchValue = base.deepClone(searchValue);
  if (isFunction(props.searchBtn?.beforeSearch)) {
    _searchValue = await props.searchBtn?.beforeSearch?.(_searchValue);
  }

  emits('search', _searchValue);

  if (isFunction(props.searchBtn?.afterSearch)) {
    await props.searchBtn?.afterSearch?.(_searchValue);
  }
};

const handleResetClick = async () => {
  Object.keys(searchValue).forEach(
    searchKey => (searchValue[searchKey] = null)
  );
  let _searchValue = base.deepClone(searchValue);
  if (isFunction(props.resetBtn?.beforeReset)) {
    _searchValue = await props.resetBtn?.beforeReset?.(_searchValue);
  }
  emits('search', _searchValue);

  if (isFunction(props.resetBtn?.afterReset)) {
    await props.resetBtn?.afterReset?.(_searchValue);
  }
};

defineExpose({
  getSearchValue: (): Record<string, any> => {
    return base.deepClone(searchValue);
  },
  setSearchValue: (key: string | number, value: any) => {
    if (props.columns.findIndex(({ prop }) => prop == key) == -1) {
      console.warn(`原始search配置项不存在${key}属性，建议修改`);
    }
    searchValue[key] = value;
  },
  handleSearchClick: handleSearchClick,
  handleResetClick: handleResetClick
});
</script>

<style lang="scss" scoped>
.fd-search {
  ::v-deep {
    & > .fd-form {
      display: flex;
      flex-wrap: wrap;
      .fd-form-item {
        margin-bottom: 12px;
        margin-right: 12px;
      }
    }
  }
}
</style>
