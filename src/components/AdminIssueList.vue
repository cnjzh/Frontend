<template>
<div  class="center">
    <h3 v-if="issueObjArr.length>0">历史工单数量{{ issueObjArr.length   }}
      <div v-for="issueObj in issueObjArr">
          <van-list>
  <van-cell v-for="item in processIssueObj(issueObj)" :key="item" :title="item" /><van-divider />
</van-list>
<div class="btn-margin" ><van-button round block type="primary" @click.prevent="showImages(issueObj)" >查看图片</van-button>
<br>

    <van-button round block type="success" v-if="issueObj.state=='wait'" >分配工单号</van-button>
</div>
<van-divider />


      </div>
         
    </h3>
    <h3 v-else class="center">未找到历史工单</h3>
</div>
</template>

<script setup>
import Config from "../assets/js/config.js"
   import {onMounted} from "vue";
import {ref} from"vue";
    import { showImagePreview } from 'vant';
import { processIssueObj } from "@/assets/js/util.js";
const {API_URL} =Config;
const issueObjArr=ref("");
const showImages=(issueObj)=>
{
  showImagePreview({
  images: JSON.parse(issueObj.image),
  closeable: true,
});
}
const loadIssueList=async()=>{
 const response=await fetch(`${API_URL}issue`);
    const result= await response.json();
    if(!response.ok||result.status!=="success")
{
    alert("加载失败");
    return ;
}
    issueObjArr.value=(result.data);
}
onMounted(async() => {
    loadIssueList();
})
</script>

<style lang="scss" scoped>

</style>