<template>
    <van-tabs v-model:active="componentName">
  <van-tab title="工单列表" name="AppAdminList"><app-admin-issue-list></app-admin-issue-list></van-tab>
  <van-tab title="创建新员工" name="AppAdminCreateStaff"><create-staff></create-staff></van-tab>

<!-- <keep-alive>
  <component :is="componentName"></component>
</keep-alive> -->


</van-tabs>

    </template>
<script >
import {ref}from "vue";
import AppCreateStaff from "./CreateStaff.vue"
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
    AppCreateStaff
  }
}

</script>
<style>
 </style>