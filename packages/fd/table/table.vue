<!--
 * @Description: 
 * @Date: 2022-07-04 16:42:21
-->
<template>
  <fd-search
    ref="fdSearchRef"
    :columns="searchConfig.searchColumns"
    :search-btn="searchConfig.searchBtn"
    :reset-btn="searchConfig.resetBtn"
    :other-components="searchConfig.othertComponents"
    @search="handleSearch"
  ></fd-search>
  <div class="slot-before slot">
    <slot
      name="tableBefore"
      :selectionRows="TableSelectionRows"
      :tableData="pageAllData"
      :searchQuery="query"
    ></slot>
  </div>
  <base-table
    class="fd-table-content"
    v-loading="pageIsLoading"
    ref="fdTablebaseTableRef"
    :data="pageAllData"
    :columns="tableConfig.tableColumns"
    @select-all="handleTableSelect"
    @select="handleTableSelect"
  ></base-table>
  <div class="slot-after slot">
    <slot
      name="tableAfter"
      :selectionRows="TableSelectionRows"
      :tableData="pageAllData"
      :searchQuery="query"
    ></slot>
  </div>
  <base-pagination
    ref="BasePaginationRef"
    :total="paginationTotal"
    :pageSize="paginationConfig.paginationPageSize"
    :currentPage="paginationConfig.paginationCurrentPage"
    @size-change="handlePageChange"
    @current-change="handlePageChange"
  ></base-pagination>
</template>

<script lang="tsx">
export default {
  name: 'fd-table'
};
</script>

<script lang="tsx" setup>
import fdSearch from '../search/search.vue';
import { BaseTable } from '../../base/table';
import { BasePagination } from '../../base/pagination';
import { useTable } from './hooks/use-table';
import { base } from 'xrk-tools';
import { BaseTableColumnProps } from '../../base/table/types/type';
import { onBeforeMount } from 'vue-demi';
import { computed, onMounted, ref } from 'vue';
import { vLoading as _vLoading } from 'element-plus';
import { fdTableProps } from './types/type';
const _props = withDefaults(
  defineProps<{
    requestNow?: boolean;
    getListAjax: (...args: any) => Promise<any> | any;
    searchConfig: {
      searchColumns: Array<any>;
      searchBtn?: any;
      resetBtn?: any;
      othertComponents?: Array<any>;
    };
    tableConfig: {
      tableColumns: Array<any>;
    };
    paginationConfig?: {
      pageNoKey?: string;
      pageSizeKey?: string;
      paginationPageSize?: number;
      paginationCurrentPage?: number;
    };
  }>(),
  {
    requestNow: true
  }
);

interface _fdTableProps extends fdTableProps {
  paginationConfig: {
    pageNoKey: string;
    pageSizeKey: string;
    paginationPageSize: number;
    paginationCurrentPage: number;
  };
}

const props = _props as Readonly<_fdTableProps>;

const vLoading = _vLoading;

const paginationConfig = computed(() => ({
  pageNoKey: 'pageNo',
  pageSizeKey: 'pageSize',
  paginationPageSize: 60,
  paginationCurrentPage: 1,
  ...((props.paginationConfig || {}) as Partial<
    _fdTableProps['paginationConfig']
  >)
}));

const TableSelectionRows = ref<any>([]);
const fdSearchRef = ref<any>(null);
const fdTablebaseTableRef = ref<any>(null);
const BasePaginationRef = ref<any>(null);
const pageNoKey = paginationConfig.value.pageNoKey as string;
const pageSizeKey = paginationConfig.value.pageSizeKey as string;

const paginationQuery = ref<{
  [propname: string]: number;
}>({
  [pageNoKey]: paginationConfig.value?.paginationCurrentPage,
  [pageSizeKey]: paginationConfig.value?.paginationPageSize
});
const searchQuery = ref<Record<string, any>>({});

const query = computed(() => ({
  ...paginationQuery.value,
  ...searchQuery.value
}));

const initSearchQuery = () => {
  const searchQueryDefault = fdSearchRef.value?.getSearchValue?.() || {};
  searchQuery.value = searchQueryDefault;
};

const initPageInfo = (pageNo = 1) => {
  BasePaginationRef.value?.setPageInfo({
    pageSize: paginationQuery.value[pageSizeKey],
    currentPage: pageNo
  });
  paginationQuery.value[pageNoKey] = pageNo;
};

const clearSelectionRows = () => {
  fdTablebaseTableRef.value?.clearSelectionRows?.();
  TableSelectionRows.value = [];
};

const handleSearch = (searchValue: any) => {
  searchQuery.value = base.deepClone(searchValue);
  initPageInfo(1);
  clearSelectionRows();
  getList?.(query.value);
};

const handlePageChange = () => {
  const pageInfo = BasePaginationRef.value?.getPageInfo?.();
  paginationQuery.value = {
    [pageNoKey]: pageInfo.currentPage,
    [pageSizeKey]: pageInfo.pageSize
  };
  getList?.(query.value);
};

const handleTableSelect = () => {
  const res = fdTablebaseTableRef.value?.getSelectionRows?.();
  TableSelectionRows.value = Array.isArray(res) ? res : [];
};

const { pageAllData, getList, paginationTotal, pageIsLoading } = useTable({
  getListAjax: props.getListAjax
});

onMounted(() => {
  initSearchQuery();
  clearSelectionRows();
  props.requestNow && getList?.(query.value);
});

defineExpose({
  getSelectionRows: () => fdTablebaseTableRef.value?.getSelectionRows?.(),
  addSelectionRow: (rowId: string | number, row: any) =>
    fdTablebaseTableRef.value?.addSelectionRow?.(rowId, row),
  removeSelectionRow: (rowId: string | number) =>
    fdTablebaseTableRef.value?.removeSelectionRow?.(rowId),
  clearSelectionRows: () => fdTablebaseTableRef.value?.clearSelectionRows?.(),

  setSearchValue: (key: string | number, value: any) =>
    fdSearchRef.value?.setSearchValue?.(key, value),
  getSearchValue: () => fdSearchRef.value?.getSearchValue?.(),

  initCurrentList: (customQuery: any) => {
    initSearchQuery();
    getList?.({ ...(customQuery || {}), ...query.value });
  },
  initList: (customQuery: any) => {
    initSearchQuery();
    initPageInfo(1);
    getList?.({ ...(customQuery || {}), ...query.value });
  }
});
</script>

<style lang="scss" scope>
$margin: 12px;
.fd-table-content {
  margin: $margin 0;
}
.slot {
  &:empty {
    margin-top: 0;
    margin-bottom: 0;
  }
  &-before {
    margin-top: $margin;
  }
  &-after {
    margin-bottom: $margin;
  }
}
</style>
