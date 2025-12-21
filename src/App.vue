

<template>
 <van-nav-bar title="维修工单系统" />
 <van-tabs v-model:active="componentName" >
 <van-tab title="首页" name="APPUpload"></van-tab>
  <van-tab title="AdminLogin管理员登陆" name="AppAdmin"></van-tab>
  <van-tab title="queryissue查询工单"name="AppQuery"> </van-tab>
  <van-tab title="history历史工单" name="AppHistory" ></van-tab>
</van-tabs>
<component :is="componentName"></component>

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
        const componentName=ref("APPUpload");
        return{
            componentName,
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


</style>
