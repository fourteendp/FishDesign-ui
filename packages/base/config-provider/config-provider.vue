<!--
 * @Description: 
 * @Date: 2022-07-09 12:34:45
-->
<template>
  <el-config-provider :locale="zhCn" namespace="fd">
    <slot></slot>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>
