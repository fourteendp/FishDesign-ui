<!--
 * @Description: 
 * @Date: 2022-07-01 14:34:52
-->
<template>
  <el-table
    class="base-table"
    :data="data"
    :height="height"
    :maxHeight="maxHeight"
    :stripe="stripe"
    :border="border"
    :size="size"
    :fit="fit"
    :rowClassName="rowClassName"
    :rowStyle="rowStyle"
    :cellClassName="cellClassName"
    :cellStyle="cellStyle"
    :headerRowClassName="headerRowClassName"
    :headerRowStyle="headerRowStyle"
    :rowKey="rowKey"
    :defaultExpandAll="defaultExpandAll"
    :expandRowKeys="expandRowKeys"
    :defaultSort="defaultSort"
    :emptyText="emptyText"
    @sort-change="handleSortChange"
  >
    <base-table-column
      v-for="column in columns"
      :key="column.prop"
      :pageAllData="data"
      :selectionRows="selectionRows"
      :getSelectionRows="getSelectionRows"
      :addSelectionRow="addSelectionRow"
      :removeSelectionRow="removeSelectionRow"
      :clearSelectionRows="clearSelectionRows"
      v-bind="column"
      @select="handleColumnSelect"
      @select-all="handleColumnSelectAll"
    ></base-table-column>
    <template #empty><slot name="empty"></slot></template>
  </el-table>
</template>

<script lang="tsx">
export default {
  name: 'base-table'
};
</script>
<script lang="tsx" setup>
import { ElTable } from 'element-plus';
import { BaseTableColumn } from './index';
import { BaseTableSortInfoType, BaseTableProps } from './types/type';
import { useTableSetup } from './store';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();
const {
  selectionRows,
  getSelectionRows,
  addSelectionRow,
  removeSelectionRow,
  clearSelectionRows
} = useTableSetup();
const _props = withDefaults(
  defineProps<{
    data: Array<Record<string, any>>;
    columns: any;

    height?: string | number;
    maxHeight?: string | number;
    stripe?: boolean;
    border?: boolean;
    size?: 'large' | 'default' | 'small';
    fit?: boolean;

    rowClassName?: any;
    rowStyle?: any;

    cellClassName?: any;
    cellStyle?: any;

    headerRowClassName?: any;
    headerRowStyle?: any;

    headerCellClassName?: any;
    headerCellStyle?: any;

    rowKey?: ((row: Record<string, any>) => string) | string;
    defaultExpandAll?: boolean;
    expandRowKeys?: Array<string>;
    emptyText?: string;
    defaultSort?: { prop: string; order: 'ascending' | 'descending' };
  }>(),
  {
    fit: true,
    border: true,
    emptyText: '暂无数据'
  }
);

const props = _props as Readonly<BaseTableProps>;

const emits = defineEmits<{
  (event: 'sort-change', info: BaseTableSortInfoType): void;
  (event: 'select', selection: any, row: any): void;
  (event: 'select-all', selection: any): void;
}>();

const handleSortChange = (info: BaseTableSortInfoType) => {
  emits('sort-change', info);
};

const handleColumnSelect = (selection: any, row: any) => {
  emits('select', selection, row);
};

const handleColumnSelectAll = (selection: any) => {
  emits('select-all', selection);
};

defineExpose({
  getSelectionRows,
  addSelectionRow,
  removeSelectionRow,
  clearSelectionRows
});
</script>

<style lang="scss" scoped>
.base-table {
  --fd-table-header-bg-color: #e6f1fc;
  $headerBorderColor: rgba(
    $color: #a3d0fd,
    $alpha: 0.5
  );
  ::v-deep {
    thead {
      position: relative;
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: $headerBorderColor !important;
        z-index: 4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    th.fd-table__cell {
      border-bottom-color: $headerBorderColor !important;
      border-left-color: $headerBorderColor !important;
      border-right-color: $headerBorderColor !important;
      & > .cell {
        color: #333;
        font-weight: normal;
      }
    }
    .fd-table__inner-wrapper::after {
      background-color: $headerBorderColor !important;
    }
  }
}
</style>
