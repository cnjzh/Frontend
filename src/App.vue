

<template>
 <van-nav-bar title="维修工单系统"  right-text="刷新" @click-right.prevent="refresh" />
 <van-tabs v-model:active="componentName" >
 <van-tab title="首页" name="APPUpload"></van-tab>
  <van-tab title="AdminLogin管理员登陆" name="AppAdmin"></van-tab>
  <van-tab title="queryissue查询工单"name="AppQuery"> </van-tab>
  <van-tab title="history历史工单" name="AppHistory" ></van-tab>
</van-tabs>
<keep-alive><component :is="componentName" :API_URL="API_URL"></component></keep-alive>


</template>
<script >
import APPUpload from "@/components/Upload.vue";
import AppAdmin from "@/components/Admin.vue";
import AppHistory from "@/components/History.vue";
import AppQuery from "@/components/Query.vue";
import {ref} from "vue";
export default  {
    name:"APP",
    setup()
    {
        const API_URL="http://127.0.0.1:3000/api/v1/"
        const componentName=ref("APPUpload"); 
        const refresh=()=>{
            location.reload(true);
        };
        return{
            componentName, refresh,API_URL,

        };
       
    },
    components:
    {
        APPUpload,
        AppAdmin,
        AppHistory,
        AppQuery,
        


    }
};


</script>
<style >
.up-load-content
{   
    width:80%;
    margin: 0,auto;
    text-align: left;
    border-width:4px;
    border-color: black;
    border-radius:4px ;
    border-bottom:20px;
}
  .upload-loading-spinner
  {
    text-align: center;
    margin-top: 40px;
  }
.center 
{
      text-align: center;
}
.btn-margin{
    margin:16px;
}
</style>
