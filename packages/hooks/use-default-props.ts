/*
 * @Description:
 * @Date: 2022-10-18 09:44:40
 */
// 作用域问题导致defineProps中无法使用
// import { inject, computed } from 'vue';
import { ElTable } from 'element-plus';

export type DefaultProps = {
  table?: { border?: boolean; useBaseClass?: boolean };
  'table-column'?: {
    align?: 'left' | 'right' | 'center';
  };
};

export const provideKey = 'defaultProps';

export const useSetGlobalDefaultProps = (props: DefaultProps) => {
  window[provideKey] = props;
};

export const useGetGlobalDefaultProps = (
  componentPropsKey: keyof DefaultProps
) => {
  const all = window[provideKey] as DefaultProps;
  const props = all && componentPropsKey ? all[componentPropsKey] : undefined;
  return {
    all,
    props
  };
};
export const useGetGlobalDefaultProp = (
  componentPropsKey: keyof DefaultProps,
  propKey: any,
  defaultValue: any
) => {
  const { props } = useGetGlobalDefaultProps(componentPropsKey);
  return !props || Reflect.get(props, propKey) === void 0
    ? defaultValue
    : Reflect.get(props, propKey);
};
