<!--
 * @Description: 
 * @Date: 2022-06-21 11:16:15
-->
<template>
  <el-input
    class="base-input"
    :type="type"
    :model-value="modelValue"
    :minlength="minlength"
    :maxlength="maxlength"
    :show-word-limit="showWordLimit"
    :placeholder="placeholder"
    :clearable="clearable"
    :formatter="formatter"
    :parser="parser"
    :show-password="showPassword"
    :disabled="disabled"
    :size="size"
    :prefix-icon="prefixIcon"
    :suffix-icon="suffixIcon"
    :rows="rows"
    :autosize="autosize"
    :autocomplete="autocomplete"
    :name="name"
    :readonly="readonly"
    :max="max"
    :min="min"
    :step="step"
    :resize="resize"
    :autofocus="autofocus"
    :form="form"
    :label="label"
    :tabindex="tabindex"
    :validate-event="validateEvent"
    :input-style="inputStyle"
    ref="BaseInputRef"
    @blur="handleBlur"
    @focus="handleFocus"
    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
    @keyup.enter="handleKeyupEnter"
  ></el-input>
</template>

<script lang="tsx">
export default {
  name: 'base-input'
};
</script>

<script lang="tsx" setup>
import { withDefaults, ref, Component, CSSProperties } from 'vue';
import { ElInput } from 'element-plus';
import { isFunction } from '../../../tools/check';
import { BaseInputProps } from './index';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const _props = withDefaults(
  defineProps<{
    modelValue?: string | number; // 选中项绑定值
    type?: 'text' | 'textarea' | 'password' | 'number'; // 类型
    maxlength?: string | number; // 最大输入长度
    minlength?: string | number; // 原生属性，最小输入长度
    showWordLimit?: boolean; // 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
    placeholder?: string; // 输入框占位文本
    clearable?: boolean; // 是否可清空
    formatter?: (value: string | number) => string; // 指定输入值的格式。(只有当 type 是"text"时才能工作)
    parser?: (value: string) => string; // 指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)
    showPassword?: boolean; // 是否显示切换密码图标
    disabled?: boolean; // 是否禁用
    size?: 'large' | 'default' | 'small'; // 输入框尺寸，只在 type 不为 'textarea' 时有效
    prefixIcon?: any; // 自定义前缀图标
    suffixIcon?: any; // 自定义后缀图标
    rows?: number; // 输入框行数，仅 type 为 'textarea' 时有效
    autosize?: any; // textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }
    autocomplete?: string; // 原生 autocomplete 属性
    name?: string; // 等价于原生 input name 属性
    readonly?: boolean; // 原生  readonly 属性，是否只读
    max?: number; // 原生 max 属性，设置最大值
    min?: number; // 原生属性，设置最小值
    step?: number; // 原生属性，设置输入字段的合法数字间隔
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'; // 控制是否能被用户缩放
    autofocus?: boolean; // 原生属性，自动获取焦点
    form?: string; // 原生属性
    label?: string; // 标签文本
    tabindex?: string | number; // 输入框的 tabindex
    validateEvent?: boolean; // 输入时是否触发表单的校验
    inputStyle?: any; // input 元素或 textarea 元素的 style

    inputRewrite?: any; // 输入时处理输入值
    changeRewrite?: any; // 发生改变时处理输入值
  }>(),
  {
    type: 'text',
    rows: 2,
    autocomplete: 'off',
    placeholder: '请输入',
    validateEvent: true
  }
);

const props = _props as Readonly<BaseInputProps>;

const emits = defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
  (event: 'blur', events: Event): void;
  (event: 'focus', events: Event): void;
  (event: 'keyup', events: KeyboardEvent): void;
  (event: 'change', value?: string | number | KeyboardEvent): void;
  (event: 'input', value?: string | number | KeyboardEvent): void;
  (event: 'clear'): void;
}>();

const updateValue = (value: string | number) => {
  emits('update:modelValue', value); // 更新父级v-model绑定变量的值;
};

const handleBlur = (event: Event) => {
  emits('blur', event);
};
const handleFocus = (event: Event) => {
  emits('focus', event);
};
const handleChange = async (value: string | number) => {
  const _value = (
    isFunction(props.changeRewrite) ? await props.changeRewrite?.(value) : value
  ) as string | number;
  updateValue(_value);
  emits('change', _value);
};
const handleInput = async (value: string | number) => {
  const _value = (
    isFunction(props.inputRewrite) ? await props.inputRewrite?.(value) : value
  ) as string | number;
  updateValue(_value);
  emits('input', _value);
};
const handleClear = () => {
  emits('clear');
};
const handleKeyupEnter = (event: KeyboardEvent) => {
  emits('keyup', event);
};

const BaseInputRef = ref<{
  focus: Function;
  blur: Function;
  select: Function;
} | null>(null);

defineExpose({
  focus: () => {
    BaseInputRef.value?.focus?.();
  },
  blur: () => {
    BaseInputRef.value?.blur?.();
  },
  select: () => {
    BaseInputRef.value?.select?.();
  }
});
</script>

<style lang="scss" scoped>
.base-input {
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  ::v-deep input[type='‘number’'] {
    -moz-appearance: textfield !important;
  }
}
</style>
