<!--
 * @Description: 考虑currentPage 和 pageSize 使用双向绑定，使父组件可修改页码 和 每页数量
                 父组件如果同时修改这两个属性，会导致同时触发size-change 和 current-change（最终可能会导致父组件的回调混乱）
                 所以不使用双向绑定，还是使用父调子的 setPageInfo 方法来设置
                 然后父通过子的 getPageInfo 方法来获取 currentPage 和 pageSize 属性
 * @Date: 2022-06-28 17:21:55
-->
<template>
  <el-pagination
    class="base-pagination"
    :small="small"
    :page-size="_pageSize"
    :current-page="_currentPage"
    :layout="_layout"
    :total="total"
    :pagerCount="pagerCount"
    :pageSizes="pageSizes"
    :hideOnSinglePage="hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handleCurrenChange"
  ></el-pagination>
</template>

<script lang="tsx">
export default {
  name: 'base-pagination'
};
</script>

<script lang="tsx" setup>
import { ElPagination } from 'element-plus';
import { withDefaults, ref, computed } from 'vue';
import { PaginationInfoType } from './index';
import { setGlobalNamespace } from '../../../tools/use-namespace';
setGlobalNamespace();

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    small: true,
    pageSize: 15,
    pagerCount: 7,
    currentPage: 1,
    pageSizes: () => [15, 60, 100],
    hideOnSinglePage: false,
    layout: () => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']
  }
);

const emits = defineEmits<{
  (event: 'size-change', paginationInfo: PaginationInfoType): void;
  (event: 'current-change', paginationInfo: PaginationInfoType): void;
  // (event: 'update:currentPage', currentPage: number): void;
  // (event: 'update:pageSize', pageSize: number): void;
}>();

const _pageSize = ref<number>(props.pageSize);
const _currentPage = ref<number>(props.currentPage);
const _layout = ref<string>(
  Array.isArray(props.layout) ? props.layout.join(',') : props.layout
);
const maxPage = computed(() => Math.ceil((props.total || 0) / _pageSize.value));

const setCurrentPage = (newCurrentPage: number) => {
  if (!newCurrentPage || newCurrentPage == _currentPage.value) return;
  if (newCurrentPage > maxPage.value) {
    // 设置的页码超过最大页码
    console.warn(`currentPage ${newCurrentPage} 大于最大页码 ${maxPage.value}`);
  } else {
    _currentPage.value = newCurrentPage;
  }
};

const setPageSize = (newPageSize: number) => {
  if (!newPageSize || newPageSize == _pageSize.value) return;
  if (props.pageSizes.includes(newPageSize)) {
    _pageSize.value = newPageSize;
  } else {
    console.warn(
      `pageSize ${newPageSize} 不在 pageSizes ${props.pageSizes} 中`
    );
  }
};

// watch(
//   () => [props.currentPage, props.pageSize],
//   ([newCurrentPage, newPageSize]) => {
//     if (newCurrentPage > maxPage.value) {
//       // 设置的页码超过最大页码
//       emits('update:currentPage', _currentPage.value);
//       console.warn(
//         `currentPage ${newCurrentPage} 大于最大页码 ${maxPage.value}`
//       );
//     } else {
//       _currentPage.value = newCurrentPage;
//     }

//     if (props.pageSizes.includes(newPageSize)) {
//       _pageSize.value = newPageSize;
//     } else {
//       emits('update:pageSize', _pageSize.value);
//       console.warn(
//         `pageSize ${newPageSize} 不在 pageSizes ${props.pageSizes} 中`
//       );
//     }
//   }
// );

const handleSizeChange = (pageSize: number) => {
  _pageSize.value = pageSize;
  // emits('update:pageSize', pageSize);
  if (maxPage.value >= _currentPage.value) {
    // 组件不会再次触发size-change事件，没有这个判断，会导致同事触发size-change 和 size-change
    emits('size-change', {
      pageSize: pageSize,
      currentPage: _currentPage.value
    });
  }
};
const handleCurrenChange = (currentPage: number) => {
  _currentPage.value = currentPage;
  // emits('update:currentPage', currentPage);
  emits('current-change', {
    pageSize: _pageSize.value,
    currentPage: currentPage
  });
};

defineExpose({
  // 父组件调用，修改组件内页面显示，不会触发emits事件。
  setPageInfo: (info: { pageSize: number; currentPage: number }) => {
    setPageSize(info.pageSize);
    setCurrentPage(info.currentPage);
  },
  getPageInfo: () => ({
    pageSize: _pageSize.value,
    currentPage: _currentPage.value
  })
});
</script>

<style lang="scss" scoped>
.base-pagination {
  justify-content: center;
  ::v-deep {
    .el-input__suffix {
      right: 12px;
    }
  }
}
</style>
