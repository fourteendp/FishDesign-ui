/*
 * @Description:
 * @Date: 2022-07-04 17:19:44
 */
import { BaseTableColumnProps } from '../../../base/table/types/type';
import {
  ComponentRender,
  ResetBtnType,
  SearchBtnType,
  SerachColumnType
} from '../../search/types/type';

export type fdTableProps = {
  /**
   * 是否立即执行getListAjax，默认是 （执行时机：onMounted）
   */
  requestNow?: boolean;
  /**
   * 获取表格数据
   */
  getListAjax: (query?: Record<string, any>) => Promise<any> | any;
  /**
   * 搜索项配置
   */
  searchConfig: {
    /**
     * 搜索项
     */
    searchColumns: Array<SerachColumnType>;
    /**
     * 搜索按钮配置
     * 点击时，执行顺序 beforeSearch -> emit.search -> afterSearch
     */
    searchBtn?: SearchBtnType;
    /**
     * 重置按钮配置
     * 点击时，执行顺序  清空组件内的值 -> beforeReset -> emit.search -> afterReset
     */
    resetBtn?: ResetBtnType;
    /**
     * 其他组件
     */
    othertComponents?: Array<ComponentRender>;
  };
  /**
   * 表格配置
   */
  tableConfig: {
    /**
     * 表格列 Array<BaseTableColumnProps>
     */
    tableColumns: Array<BaseTableColumnProps>;
  };
  /**
   * 分页器配置
   */
  paginationConfig?: {
    /**
     * 当前页key，默认pageNo
     */
    pageNoKey?: string;
    /**
     * 每页数量key，默认pageSize
     */
    pageSizeKey?: string;
    /**
     * 每页条数，默认60 ， 范围[15,60,100]
     */
    paginationPageSize?: number;
    /**
     * 当前页码，默认1
     */
    paginationCurrentPage?: number;
  };
};
