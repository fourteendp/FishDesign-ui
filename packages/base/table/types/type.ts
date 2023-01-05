import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { Component, ComputedRef, CSSProperties, Ref } from 'vue';

export type RowClassNameType = (info: {
  row: Record<string, any>;
  rowIndex: string | number;
}) => string;
export type RowStyleType = (info: {
  row: Record<string, any>;
  rowIndex: string | number;
}) => CSSProperties;
export type CellClassNameType = (info: {
  row: Record<string, any>;
  column: TableColumnCtx<any>;
  rowIndex: string | number;
  columnIndex: string | number;
}) => string;
export type CellStyleType = (info: {
  row: Record<string, any>;
  column: TableColumnCtx<any>;
  rowIndex: string | number;
  columnIndex: string | number;
}) => CSSProperties;
export type BaseTableSortInfoType = {
  column: TableColumnCtx<any>;
  prop: string;
  order: 'ascending' | 'descending' | null;
};

export type BaseTableProps = {
  data: Array<Record<string, any>>;
  columns: Array<BaseTableColumnProps>;

  height?: string | number;
  maxHeight?: string | number;
  stripe?: boolean;
  border?: boolean;
  size?: 'large' | 'default' | 'small';
  fit?: boolean;

  rowClassName?: RowClassNameType;
  rowStyle?: RowStyleType | CSSProperties;

  cellClassName?: CellClassNameType;
  cellStyle?: CellStyleType | CSSProperties;

  headerRowClassName?: RowClassNameType;
  headerRowStyle?: RowStyleType | CSSProperties;

  headerCellClassName?: CellClassNameType;
  headerCellStyle?: CellStyleType | CSSProperties;

  rowKey?: ((row: Record<string, any>) => string) | string;
  defaultExpandAll?: boolean;
  expandRowKeys?: Array<string>;
  emptyText?: string;
  defaultSort?: { prop: string; order: 'ascending' | 'descending' };

  onSortChange?: (info: BaseTableSortInfoType) => void;
  onSelect?: (selection: any, row: any) => void;
  onSelectAll?: (selection: any) => void;
};

export type BaseTableColumnProps = {
  pageAllData?: Array<Record<string, any>>;
  prop?: string;
  type?: 'index' | 'expand' | '_selection';
  index?: number | ((index: number) => number);
  label?: string;
  columnKey?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: boolean | 'left' | 'right';
  sortable?: boolean | 'custom';
  sortMethod?: (a: any, b: any) => number;
  sortBy?: Array<string> | string | ((row: any, index: number) => string);
  sortOrders?: Array<'ascending' | 'descending' | null>;
  showOverflowTooltip?: boolean;
  align?: 'left' | 'right' | 'center';
  headerAlign?: 'left' | 'right' | 'center';
  className?: string;
  labelClassName?: string;

  /**
   * 最多显示多少行，超出时省略号，默认 1 ； 如果使用了render配置，则失效
   */
  textLineClamp?: number;

  /**
   * 自定义列头
   */
  renderHeader?: (info: {
    column: TableColumnCtx<any>;
    index: number;
    /**
     * 全选属性，当列的type = "_selection"时有效
     */
    selectionInfo?: {
      /**
       * 全选/取消全选
       */
      toggleCheckAll?: () => void;
      /**
       * 是否全部选中
       */
      checkboxAllChecked: ComputedRef<boolean>;
      /**
       * 是否部分选中
       */
      checkboxAllIndeterminate: ComputedRef<boolean>;
      /**
       * 是否选择中
       */
      selectionAllLoading: Ref<boolean>;
    };
  }) => JSX.Element;
  /**
   * 格式化数据
   */
  formatter?: (info: {
    row: Record<string, any>;
    cellValue: any;
    column: TableColumnCtx<any>;
    index: number;
  }) => any;
  /**
   * 自定义cell内容
   */
  render?: (info: {
    row: Record<string, any>;
    cellValue: any;
    column: TableColumnCtx<any>;
    index: number;
  }) => JSX.Element;

  /**
   * 禁用每列的selection
   */
  selectionDisabled?: ((row: any) => boolean) | boolean;

  selectionRows?: Map<number | string, any>;
  hasSelectionRow?: (rowId: any) => boolean;
  addSelectionRow?: (rowId: any, row: any) => void;
  removeSelectionRow?: (rowId: any) => void;
  getSelectionRows?: () => Array<any>;
  clearSelectionRows?: () => void;

  /**
   * 点击表头全选框 ，选中前
   */
  selectionAllBefore?: (done: Function) => Promise<void> | void;
  /**
   * 点击多选框 ，选中前
   */
  selectionAddBefore?: (row: any, done: Function) => Promise<void> | void;
  /**
   * 点击多选框 ，选中后
   */
  selectionAddAfter?: (row: any) => Promise<void> | void;
  /**
   * 点击多选框 ，移除前
   */
  selectionRemoveBefore?: (row: any, done: Function) => Promise<void> | void;
  /**
   * 点击多选框 ，移除后
   */
  selectionRemoveAfter?: (row: any) => Promise<void> | void;
};
