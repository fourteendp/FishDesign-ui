/*
 * @Description:
 * @Date: 2022-07-01 11:12:14
 */
import { DefineComponent } from 'vue';
import _BasePagination from './pagination.vue';

export type PaginationInfoType = {
  pageSize: number;
  currentPage: number;
};

export type BasePaginationProps = {
  small?: boolean;
  currentPage?: number; // 当前页数
  pageSize?: number; // 每页显示条目个数
  total?: number; // 总条目数
  pagerCount?: number; // 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
  pageSizes?: Array<number>; // 每页显示个数选择器的选项设置
  hideOnSinglePage?: boolean; // 只有一页时是否隐藏
  layout?: Array<
    'sizes' | 'prev' | 'pager' | 'next' | 'jumper' | '->' | 'total' | 'slot'
  >; // 组件布局，子组件名

  onSizeChange?: (paginationInfo: PaginationInfoType) => void;
  onCurrentChange?: (paginationInfo: PaginationInfoType) => void;
};

export const BasePagination =
  _BasePagination as DefineComponent<BasePaginationProps>;
