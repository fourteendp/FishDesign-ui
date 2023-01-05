<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:27
-->
<template>
  <el-select
    v-model="selectValue"
    :key="selectValue"
    :placeholder="placeholder"
    :multiple="multiple"
    :disabled="disabled"
    :size="size"
    :clearable="clearable"
    :collapseTags="collapseTags"
    :collapseTagsTooltip="collapseTagsTooltip"
    :multipleLimit="multipleLimit"
    :filterable="_filterable"
    :allowCreate="allowCreate"
    :filterMethod="_filterMethod"
    :loading="loading"
    :remoteMethod="remoteMethod"
    :loadingText="loadingText"
    :noMatchText="noMatchText"
    :noDataText="noDataText"
    :fitInputWidth="fitInputWidth"
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @remove-tag="handleRemoveTag"
    @clear="handleClear"
  >
    <template v-if="group">
      <el-option-group
        v-for="(group, index) in _options"
        :key="`${_Reflect.get(group, labelKey)}-${index}`"
        :label="_Reflect.get(group, labelKey)"
      >
        <el-option
          class="option"
          v-for="(item, index) in _Reflect.get(group, optionsKey) || []"
          :key="`${item[valueKey]}-${index}`"
          :label="item[labelKey]"
          :value="item[valueKey]"
        >
          <base-tool-tip
            :content="item[labelKey]"
            :hideAfter="0"
            :enterable="false"
            transition="none"
            :disabled="toolTipDisabled"
            :overShow="true"
          >
            <span>{{ item[labelKey] }}</span>
          </base-tool-tip>
        </el-option>
      </el-option-group>
    </template>
    <template v-else>
      <el-option
        class="option"
        v-for="(item, index) in _options"
        :key="`${_Reflect.get(item, labelKey)}-${index}`"
        :label="_Reflect.get(item, labelKey)"
        :value="_Reflect.get(item, valueKey)"
      >
        <base-tool-tip
          :content="_Reflect.get(item, labelKey)"
          :hideAfter="0"
          :enterable="false"
          transition="none"
          :disabled="toolTipDisabled"
          :overShow="true"
        >
          {{ _Reflect.get(item, labelKey) }}
        </base-tool-tip>
      </el-option>
    </template>
  </el-select>
</template>

<script lang="tsx">
export default {
  name: 'base-select'
};
</script>

<script lang="tsx" setup>
import { ElSelect, ElOption, ElOptionGroup } from 'element-plus';
import { BaseToolTip } from '../tool-tip';
import { ref, watch, computed, withDefaults, Ref } from 'vue';
import { base } from 'xrk-tools';
import { isFunction } from '../../../tools/check';
import { SelectOptionType, SelectValueType, BaseSelectProps } from '.';
import { check } from 'xrk-tools';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const _Reflect = Reflect;

const _props = withDefaults(
  defineProps<{
    init?: boolean; // 初始化组件时 执行 remoteMethod 方法
    filterUseRemote?: boolean; // 使用远程搜索
    options?: any; // 下拉选项
    group?: boolean; // 是否分组
    labelKey?: string;
    valueKey?: string;
    optionsKey?: string;

    modelValue?: any; // 选中项绑定值
    multiple?: boolean; // 是否多选
    disabled?: boolean; // 是否禁用
    size?: 'large' | 'default' | 'small'; // 输入框尺寸
    clearable?: boolean; // 是否可以清空选项
    collapseTags?: boolean; // 多选时是否将选中值按文字的形式展示
    collapseTagsTooltip?: boolean; // 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapse-tags属性必须设定为 true
    multipleLimit?: number; // multiple 属性设置为 true 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制
    placeholder?: string; // 占位文字
    filterable?: boolean; // Select 组件是否可筛选
    allowCreate?: boolean; // 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。
    fitInputWidth?: boolean; // 下拉框的宽度是否与输入框相同
    filterMethod?: (searchVal: string) => Array<SelectValueType>; // 自定义筛选方法

    remoteMethod?: Function; // 远程方法
    loadingText?: string; // 从服务器加载内容时显示的文本
    noMatchText?: string; // 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置
    noDataText?: string; // 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容
  }>(),
  {
    init: false,
    filterUseRemote: false,
    fitInputWidth: true,
    labelKey: 'label',
    valueKey: 'value',
    optionsKey: 'options',
    loadingText: '加载中',
    noMatchText: '暂无数据',
    noDataText: '暂无数据'
  }
);

interface _BaseSelectProps extends BaseSelectProps {
  valueKey: string;
}

const props = _props as Readonly<_BaseSelectProps>;

const setOptionsData = async (val?: string) => {
  if (isFunction(props.remoteMethod)) {
    try {
      loading.value = true;
      const res = await props.remoteMethod?.(val);
      let data = check.isObject(res.data)
        ? Array.isArray(res.data.list)
          ? res.data.list
          : []
        : Array.isArray(res.data)
        ? res.data
        : [];
      loading.value = false;
      // 避免多次请求接口 接口响应先后顺序不一致导致数据错乱
      _options.value = Array.isArray(data)
        ? data.filter(
            i => !val || `${i[props.labelKey || 'label']}`.indexOf(val) > -1
          )
        : [];
    } catch (error) {
      loading.value = false;
      console.error(error);
    }
  }
};

const _filterable = computed(
  () => props.filterable || isFunction(props.remoteMethod)
);
const debounceSetOptionsData = base.debounce(setOptionsData, 600);
const _filterMethod = (
  props.filterUseRemote
    ? (val: string) => {
        loading.value = true;
        debounceSetOptionsData(val);
      }
    : props.filterMethod
) as Function | undefined;

const toolTipDisabled = ref<boolean>(true);
const loading = ref<boolean>(false);
const _options = ref<typeof props.options>(props.options);
const selectValue = ref<typeof props.modelValue>(
  props.multiple && props.modelValue && !Array.isArray(props.modelValue)
    ? [props.modelValue]
    : props.modelValue
) as Ref<any>;
// 父组件值发生改变时，同步selectValue
watch(
  () => props.modelValue,
  newV => {
    selectValue.value = newV as SelectValueType;
  }
);

const emits = defineEmits<{
  (event: 'update:modelValue', value: SelectValueType): void;
  (
    event: 'change',
    value: SelectValueType,
    SelectOption: Array<SelectOptionType>
  ): void;
  (event: 'remove-tag', value: SelectValueType): void;
  (event: 'visible-change', visibleStatus: boolean): void;
  (event: 'clear'): void;
}>();

const getSelectOptions = (
  options: Array<SelectOptionType>,
  selectValue: SelectValueType | Array<SelectValueType>
) => {
  return options.reduce((pre: typeof options, option: SelectOptionType) => {
    if (
      Array.isArray(selectValue)
        ? selectValue.includes(Reflect.get(option, props.valueKey))
        : Reflect.get(option, props.valueKey) == selectValue
    ) {
      pre.push(option);
    }
    if (Array.isArray(option.options)) {
      pre.push(...getSelectOptions(option.options, selectValue));
    }
    return pre;
  }, []);
};

const handleChange = (value: SelectValueType) => {
  emits('update:modelValue', value);
  emits(
    'change',
    value,
    Array.isArray(_options.value) ? getSelectOptions(_options.value, value) : []
  );
};
const handleVisibleChange = (visibleStatus: boolean) => {
  toolTipDisabled.value = !visibleStatus;
  if (visibleStatus) {
    setOptionsData();
  }
  emits('visible-change', visibleStatus);
};
const handleClear = () => {
  emits('clear');
};
const handleRemoveTag = (value: SelectValueType) => {
  emits('remove-tag', value);
};

if (props.init) {
  setOptionsData();
}
</script>

<style lang="scss" scoped>
@import '../../../styles/element/mixin.scss';
.option {
  padding-right: 18px;
  ::v-deep {
    .fd-tooltip__trigger {
      @include line_clamp(1);
      word-break: break-all;
    }
  }
}
</style>
