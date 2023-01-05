/*
 * @Description:
 * @Date: 2022-07-01 15:57:35
 */
import { BaseTableColumnProps } from '../types/type';

export const useTableColumn = (
  props: BaseTableColumnProps
): BaseTableColumnProps => {
  return {
    minWidth: '120px',
    width: props.type === 'index' ? '90px' : '',
    ...props
  };
};
