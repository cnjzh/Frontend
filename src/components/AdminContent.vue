<template>
    <van-tabs v-model:active="componentName">
  <van-tab title="工单列表" name="AppAdminList">工单列表</van-tab>
  <van-tab title="创建新员工" name="AppAdminCreateStaff">创建新员工</van-tab>

<!-- <keep-alive>
  <component :is="componentName"></component>
</keep-alive> -->
<app-admin-issue-list></app-admin-issue-list>
</van-tabs>

    </template>
<script >
import {ref}from "vue";
import AppAdminIssueList from "./AdminIssueList.vue";
export default
{
  setup(){
const componentName=ref("AppAdminIssueList");
    return {componentName};

  },
  name:"AppAdminContent",
  components:
  {
    AppAdminIssueList,
  }
}

</script>
<style>
 </style>