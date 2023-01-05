<!--
 * @Description: 
 * @Date: 2022-07-08 17:04:15
-->
<template>
  <base-button @click="test">123</base-button>
  <base-date-picker
    :type="'monthrange'"
    :format="'YYYY-MM'"
    :value-format="'YYYY-MM'"
    @change="onDateChange"
    @calendar-change="onCalendarChange"
  ></base-date-picker>
  <base-date-picker
    :type="'daterange'"
    :format="'YYYY-MM'"
    :value-format="'YYYY-MM'"
    @change="onDateChange"
    @calendar-change="onCalendarChange"
  ></base-date-picker>
  <base-table
    style="width: 300px"
    :data="[
      { id: 1, name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
      { id: 2, name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
      { id: 3, name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
      { id: 4, name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' }
    ]"
    :columns="[
      {
        type: '_selection',
        prop: 'id'
      },
      {
        label: 'xxxx',
        prop: 'id'
      },
      {
        label: 'name',
        prop: 'name'
      }
    ]"
  ></base-table>
  <base-select v-bind="test11" clearable></base-select>
</template>

<script>
export default {
  name: 'example-app'
};
</script>

<script setup>
import { BaseDatePicker } from '../../packages/base/date-picker/index';
import { BaseButton } from '../../packages/base/button/index';
import { BaseTable } from '../../packages/base/table/index';
import { BaseSelect } from '../../packages/base/select/index';
const onDateChange = (...args) => {
  console.log('change', args);
};
const onCalendarChange = (...args) => {
  console.log(args);
};
const test = () => {
  console.log('cs');
};

const industryList = () => {
  return new Promise(r => {
    r({
      status: 1,
      message: '操作成功',
      code: '1',
      data: {
        total: 15,
        list: [
          {
            auditStatus: 0,
            enterpriseId: 22,
            enterpriseName: '上海证券有限责任公司',
            createDt2: 1655110540000
          },
          {
            auditStatus: 0,
            enterpriseId: 17,
            enterpriseName: '重庆龙湖地产发展有限公司',
            createDt2: 1651744899000
          },
          {
            auditStatus: 0,
            enterpriseId: 14,
            enterpriseName: '青岛悟空智联医疗科技有限公司',
            createDt2: 1651744514000
          },
          {
            auditStatus: 0,
            enterpriseId: 13,
            enterpriseName: '山丹县思源家庭农场',
            createDt2: 1651744310000
          },
          {
            auditStatus: 0,
            enterpriseId: 12,
            enterpriseName: '重庆海扶医疗科技股份有限公司',
            createDt2: 1648186805000
          },
          {
            auditStatus: 0,
            enterpriseId: 10,
            enterpriseName: '深圳市宝能投资集团有限公司',
            createDt2: 1648025523000
          },
          {
            auditStatus: 1,
            enterpriseId: 6,
            enterpriseName: '深圳蓝海湾建设有限责任公司',
            createDt2: 1647921224000
          },
          {
            auditStatus: 1,
            enterpriseId: 2,
            enterpriseName: '英雄联盟（广州）科技有限公司',
            createDt2: 1647596141000
          },
          {
            auditStatus: 3,
            enterpriseId: 23,
            enterpriseName: '北京龙德缘售电有限公司',
            createDt2: 1655357316000
          },
          {
            auditStatus: 3,
            enterpriseId: 18,
            enterpriseName: '重庆锐明信息技术有限公司',
            createDt2: 1651746649000
          },
          {
            auditStatus: 3,
            enterpriseId: 16,
            enterpriseName: '阿里巴巴（中国）有限公司',
            createDt2: 1651744684000
          },
          {
            auditStatus: 3,
            enterpriseId: 15,
            enterpriseName: '杭州娃哈哈集团有限公司',
            createDt2: 1651744553000
          },
          {
            auditStatus: 3,
            enterpriseId: 9,
            enterpriseName: '张掖市山水文体旅游集团有限公司',
            createDt2: 1648023949000
          },
          {
            auditStatus: 3,
            enterpriseId: 5,
            enterpriseName: '江河创建集团股份有限公司',
            createDt2: 1647917041000
          },
          {
            auditStatus: 3,
            enterpriseId: 3,
            enterpriseName: '康师傅方便面投资（中国）有限公司-乙方',
            createDt2: 1647826648000
          }
        ],
        name: null,
        remarkMap: null,
        selectedSize: null
      }
    });
  });
};

const test11 = {
  placeholder: '工业',
  filterUseRemote: true,
  remoteMethod: async val => {
    const data = await industryList({
      enterpriseName: val
    });
    console.log(data);
    data.data.list = data.data.list.filter(
      i => i.enterpriseId && i.enterpriseId != -1
    );
    return data;
  },
  labelKey: 'enterpriseName',
  valueKey: 'enterpriseId'
};
</script>

<style lang="scss">
.ok {
  color: blue;
}
</style>
