<template>
    <van-tabs v-model:active="componentName">
  <van-tab title="工单列表" name="issueList">工单列表</van-tab>
  <van-tab title="创建新员工" name="createStaff">创建新员工</van-tab>

</van-tabs>

    </template>
<script setup>
import {ref}from "vue"
const componentName=ref("issueList")
</script>
<style>
 </style>