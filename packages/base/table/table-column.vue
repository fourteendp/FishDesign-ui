<!--
 * @Description: 
 * @Date: 2022-07-01 15:08:09
-->
<template>
  <el-table-column
    :prop="prop"
    :type="type"
    :index="index"
    :label="label"
    :columnKey="columnKey"
    :width="width"
    :minWidth="minWidth"
    :fixed="fixed"
    :sortable="sortable"
    :sortMethod="sortMethod"
    :sortBy="sortBy"
    :sortOrders="sortOrders"
    :align="align"
    :headerAlign="headerAlign"
    :className="className"
    :labelClassName="labelClassName"
    :textLineClamp="textLineClamp"
  >
    <template v-slot="{ row, column, $index }">
      <base-table-column-content-render
        v-if="render"
        :row="row"
        :column="column"
        :cellValue="prop ? row[prop] : ''"
        :index="$index"
      ></base-table-column-content-render>
      <div
        v-else-if="type == '_selection'"
        style="display: inline-block"
        @click.prevent="handleCheckboxClick(row)"
      >
        <base-checkbox
          class="table-base-checkbox"
          v-loading="row._selectionLoading"
          :model-value="checked(row)"
          :disabled="_selectionDisabled(row)"
        ></base-checkbox>
      </div>
      <div v-else class="base-table-column">
        <base-tool-tip
          :content="getColumnValue(row, $index, column)"
          :hideAfter="0"
          :enterable="false"
          transition="none"
          :overShow="showOverflowTooltip"
          :style="{ '-webkit-line-clamp': textLineClamp || 1 }"
        >
          {{ getColumnValue(row, $index, column) }}
        </base-tool-tip>
      </div>
    </template>

    <template v-slot:header="{ column, $index }" v-if="renderHeader">
      <base-table-column-header-render
        :index="$index"
        :column="column"
      ></base-table-column-header-render>
    </template>
    <template v-slot:header v-else-if="type == '_selection'">
      <base-checkbox
        class="table-base-checkbox"
        v-loading="_selectionAllLoading"
        @click.prevent="handleCheckboxAllClick"
        :model-value="checkboxAllChecked"
        :indeterminate="checkboxAllIndeterminate"
      >
        {{ selectionRows.size > 0 ? `已选${selectionRows.size}项` : '' }}
      </base-checkbox>
    </template>
  </el-table-column>
</template>

<script lang="tsx">
export default {
  name: 'base-table-column'
};
</script>
<script lang="tsx" setup>
import { BaseToolTip } from '../tool-tip';
import { BaseCheckbox } from '../checkbox';
import { ElTableColumn, vLoading as _vLoading } from 'element-plus';
import { computed, defineComponent, ref } from 'vue';
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';
import { useTableSetup } from './store';
import { isFunction } from '../../../tools/check';
import { BaseTableColumnProps } from './types/type';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const vLoading = _vLoading;
const _props = withDefaults(
  defineProps<{
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

    textLineClamp?: number;

    renderHeader?: (info: any) => any;
    formatter?: (info: any) => any;
    render?: (info: any) => any;

    selectionDisabled?: ((row: any) => boolean) | boolean;

    selectionRows?: any;
    hasSelectionRow?: (rowId: any) => boolean;
    addSelectionRow?: (rowId: any, row: any) => void;
    removeSelectionRow?: (rowId: any) => void;
    getSelectionRows?: () => Array<any>;
    clearSelectionRows?: () => void;

    selectionAllBefore?: (done: Function) => Promise<void> | void;
    selectionAddBefore?: (row: any, done: Function) => Promise<void> | void;
    selectionAddAfter?: (row: any) => Promise<void> | void;
    selectionRemoveBefore?: (row: any, done: Function) => Promise<void> | void;
    selectionRemoveAfter?: (row: any) => Promise<void> | void;
  }>(),
  {
    align: 'center',
    showOverflowTooltip: true,
    textLineClamp: 1
  }
);

const props = _props as Readonly<BaseTableColumnProps>;

const emits = defineEmits<{
  (event: 'select', selection: any, row: any): void;
  (event: 'select-all', selection: any): void;
}>();

const _selectionAllLoading = ref<boolean>(false);

const BaseTableColumnHeaderRender = defineComponent({
  name: 'table-column-header-render',
  props: ['column', 'index'],
  render: (params: any) => {
    return props.renderHeader
      ? props.renderHeader(
          props.type == '_selection'
            ? {
                column: params.column,
                index: params.index,
                selectionInfo: {
                  toggleCheckAll: handleCheckboxAllClick,
                  checkboxAllChecked: checkboxAllChecked,
                  checkboxAllIndeterminate: checkboxAllIndeterminate,
                  selectionAllLoading: _selectionAllLoading
                }
              }
            : { column: params.column, index: params.index }
        )
      : '';
  }
});
const BaseTableColumnContentRender = defineComponent({
  name: 'table-column-content-render',
  props: ['column', 'cellValue', 'row', 'index'],
  render: (params: any) => {
    return props.render
      ? props.render({
          column: params.column,
          index: params.index,
          cellValue: params.cellValue,
          row: params.row
        })
      : '';
  }
});

const _selectionDisabled = (row: any) => {
  if (isFunction(props.selectionDisabled)) {
    const status = props?.selectionDisabled?.(row);
    // if (status && props.prop && selectionRows?.has(row[props.prop])) {
    //   console.log(row[props.prop], row, '已被禁用，无法设置选中');
    //   removeSelectionRow?.(row[props.prop]);
    // }
    return status;
  } else {
    return props.selectionDisabled;
  }
};

const getColumnValue = (row: any, index: number, column: any) => {
  if (props.type == 'index') return `${index + 1}`;
  if (props.formatter) {
    return props.formatter({
      row,
      column: column,
      cellValue: props.prop && row[props.prop],
      index: index
    });
  }
  return (props.prop && row[props.prop]) || '-';
};

const { selectionRows, addSelectionRow, removeSelectionRow, getSelectionRows } =
  props;

const checked = computed(() => {
  return (row: any) => {
    return props.prop && selectionRows?.has(row[props.prop]);
  };
});
const filterPageAllData = computed(() =>
  Array.isArray(props.pageAllData)
    ? props.pageAllData.filter(row => !_selectionDisabled(row))
    : []
);

const checkboxAllChecked = computed(() => {
  return (
    filterPageAllData.value.length > 0 &&
    filterPageAllData.value.every(
      (row: any) =>
        props.prop && row[props.prop] && selectionRows?.has(row[props.prop])
    )
  );
});
const checkboxAllIndeterminate = computed(() => {
  return (
    filterPageAllData.value.length > 0 &&
    !checkboxAllChecked.value &&
    filterPageAllData.value.some(
      (row: any) =>
        props.prop && row[props.prop] && selectionRows?.has(row[props.prop])
    )
  );
});

const handleCheckboxAllClick = async () => {
  if (Array.isArray(props.pageAllData)) {
    if (_selectionAllLoading.value) return;
    const fn = () => {
      if (checkboxAllChecked.value) {
        // 已经选择全部
        filterPageAllData.value.forEach(row => {
          props.prop && removeSelectionRow?.(row[props.prop]);
        });
      } else {
        filterPageAllData.value.forEach(row => {
          props.prop && addSelectionRow?.(row[props.prop], row);
        });
      }
    };
    try {
      _selectionAllLoading.value = true;
      if (isFunction(props.selectionAllBefore)) {
        await props.selectionAllBefore(fn);
      } else {
        fn();
      }
    } catch (error) {}
    _selectionAllLoading.value = false;
  }
  emits('select-all', getSelectionRows?.());
};

const handleCheckboxClick = async (row: any) => {
  if (_selectionDisabled(row) || row._selectionLoading) return;
  if (props.prop) {
    row._selectionLoading = true;
    try {
      if (selectionRows?.has(row[props.prop])) {
        if (isFunction(props.selectionRemoveBefore)) {
          await props.selectionRemoveBefore(
            row,
            removeSelectionRow
              ? removeSelectionRow.bind(null, row[props.prop])
              : () => {}
          );
        } else {
          removeSelectionRow?.(row[props.prop]);
        }
        row._selectionLoading = false;

        isFunction(props.selectionRemoveAfter) &&
          (await props.selectionRemoveAfter(row));
      } else {
        if (isFunction(props.selectionAddBefore)) {
          await props.selectionAddBefore(
            row,
            addSelectionRow
              ? addSelectionRow.bind(null, row[props.prop], row)
              : () => {}
          );
        } else {
          addSelectionRow?.(row[props.prop], row);
        }
        row._selectionLoading = false;

        isFunction(props.selectionAddAfter) &&
          (await props.selectionAddAfter(row));
      }
      emits('select', getSelectionRows?.(), row);
    } catch (error) {
      row._selectionLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/element/mixin.scss';
.base-table-column {
  ::v-deep {
    .fd-tooltip__trigger {
      @include line_clamp(1);
      word-break: break-all;
    }
  }
}
.table-base-checkbox {
  ::v-deep {
    .fd-loading-mask {
      background-color: transparent;
    }
    .fd-loading-spinner {
      width: 24px;
      height: 24px;
      margin-top: 0;
      top: 50%;
      left: -5px;
      transform: translateY(-50%);
      .circular {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
