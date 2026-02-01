<template>
    <van-tabs v-model:active="componentName">
  <van-tab title="工单列表" name="issueList">工单列表</van-tab>
  <van-tab title="创建新员工" name="createStaff">创建新员工</van-tab>
<component :is="componentName"></component>
</van-tabs>

    </template>
<script >
import {ref}from "vue";
import AppAdminIssueList from "./AdminIssueList.vue";
const componentName=ref("AppAdminIssueList")
export default
{
  name:{AdminContent},
  component:
  {
    AppAdminIssueList,
  }
}

</script>
<style>
 </style>