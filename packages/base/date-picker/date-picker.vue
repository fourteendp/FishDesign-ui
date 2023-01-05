<!--
 * @Description: 
 * @Date: 2022-06-21 11:17:01
-->
<template>
  <el-date-picker
    v-model="dateValue"
    :readonly="readonly"
    :disabled="disabled"
    :size="size"
    :editable="editable"
    :clearable="clearable"
    :placeholder="placeholder"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :type="type"
    :format="format"
    :popper-class="popperClass"
    :range-separator="rangeSeparator"
    :default-value="defaultValue"
    :default-time="defaultTime"
    :value-format="valueFormat"
    :unlink-panels="unlinkPanels"
    :prefix-icon="prefixIcon"
    :clear-icon="clearIcon"
    :validate-event="validateEvent"
    :disabled-date="_disabledDate"
    :shortcuts="shortcuts"
    :cell-class-name="cellClassName"
    :teleported="teleported"
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @calendar-change="handleCalendarChange"
  ></el-date-picker>
</template>

<script lang="tsx">
export default {
  name: 'base-date-picker'
};
</script>
<script lang="tsx" setup>
import { withDefaults, ref, Component, computed, watch } from 'vue';
import { ElDatePicker } from 'element-plus';
import { isFunction } from '../../../tools/check';
import { BaseDatePickerProps } from './index';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const _props = withDefaults(
  defineProps<{
    modelValue?: any; // 选中项绑定值
    readonly?: boolean; // 只读
    disabled?: boolean; // 禁用
    size?: 'large' | 'default' | 'small'; // 输入框尺寸
    editable?: boolean; // 文本框可输入
    clearable?: boolean; // 是否显示清除按钮
    placeholder?: string; // 非范围选择时的占位内容
    startPlaceholder?: string; // 范围选择时开始日期的占位内容
    endPlaceholder?: string; // 范围选择时结束日期的占位内容
    type?:
      | 'year'
      | 'month'
      | 'date'
      | 'dates'
      | 'datetime'
      | 'week'
      | 'datetimerange'
      | 'daterange'
      | 'monthrange'; // 显示类型
    format?: string; // 显示在输入框中的格式
    popperClass?: string; // DatePicker 下拉框的类名
    rangeSeparator?: string; // 选择范围时的分隔符
    defaultValue?: any; // 可选，选择器打开时默认显示的时间
    defaultTime?: any; // 范围选择时选中日期所使用的当日内具体时刻
    valueFormat?: string; // 可选，绑定值的格式。 不指定则绑定值为 Date 对象
    unlinkPanels?: boolean; // 在范围选择器里取消两个日期面板之间的联动
    prefixIcon?: any; // 自定义前缀图标
    clearIcon?: any; // 自定义清除图标
    validateEvent?: boolean; // 输入时是否触发表单的校验
    disabledDate?: (date: Date, startDt: Date | null) => boolean; // 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
    shortcuts?: any; // 设置快捷选项，需要传入数组对象
    cellClassName?: (date: Date) => string; // 设置自定义类名
    teleported?: boolean; // 是否将 date-picker 的下拉列表插入至 body 元素
  }>(),
  {
    type: 'date',
    placeholder: '请选择日期',
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期',
    teleported: true,
    clearable: true
  }
);

const props = _props as Readonly<BaseDatePickerProps>;

const emits = defineEmits<{
  (event: 'change', activeValue: any): void;
  (event: 'visibleChange', visibility: boolean): void;
  (event: 'calendarChange', val: [Date, Date | null]): void;
  (event: 'update:modelValue', activeValue: any): void;
}>();

// 越过类型不匹配导致的ts报错
const defaultTime = computed(() => props.defaultTime) as any;

const valueFormat = computed(
  () =>
    props.valueFormat ||
    (props.type &&
      (['datetime', 'datetimerange'].includes(props.type)
        ? 'YYYY-MM-DD HH:mm:ss'
        : 'YYYY-MM-DD'))
);

const startDt = ref<Date | null>(null);
const dateValue = ref<any>(props.modelValue);
// 父组件值发生改变时，同步dateValue
watch(
  () => props.modelValue,
  newV => {
    dateValue.value = newV;
  }
);

const _disabledDate = (date: Date) => {
  if (isFunction(props?.disabledDate)) {
    return props?.disabledDate?.(date, startDt.value);
  }
};

const handleChange: any = (val: typeof props.modelValue) => {
  startDt.value = null;
  emits('update:modelValue', val);
  emits('change', val);
};
const handleVisibleChange: any = (visibility: boolean) => {
  // startDt.value = null;
  emits('visibleChange', visibility);
};
const handleCalendarChange: any = (val: [Date, Date | null]) => {
  startDt.value = val[0];
  emits('calendarChange', val);
};
</script>

<style lang="scss" scoped></style>
