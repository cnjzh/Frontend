

<template>
 <van-nav-bar title="维修工单系统" />
 <van-tabs >
      <van-tab title="首页"></van-tab>
  <van-tab title="AdminLogin管理员登陆">
   

  </van-tab>
  <van-tab title="queryissue查询工单"></van-tab>
  <van-tab title="history历史工单"></van-tab>
</van-tabs>
<component :is="componentName"></component>

</template>
<script >
    import APPUpload from "@/components/Upload.vue";
import {ref} from "vue";
export default  {
    name:"APP",
    setup()
    {
        const poster=ref("");
        const description=ref("");
        const componentName=ref("APPUpload")
        return {
            poster,
            description,
            componentName
        };

    },
    components:
    {
        APPUpload,

    }
}


</script>
<style >


</style>
