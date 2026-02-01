<template>
   <van-loading color="#0094ff"
size="40px"
v-if="!load_complete"
class="upload-loading-spinner">
加载中ing
</van-loading>
<div v-else class="center">
    <h3 v-if="issueObjArr.length>0">历史工单数量{{ issueObjArr.length   }}
      <div v-for="issueObj in issueObjArr">
          <van-list>
  <van-cell v-for="item in processIssueObj(issueObj)" :key="item" :title="item" />
</van-list>
<div class="btn-margin" ><van-button round block type="primary" @click.prevent="showImages(issueObj)" >查看图片</van-button></div>
      </div>
         
    </h3>
    <h3 v-else class="center">未找到历史工单</h3>
</div>
</template>
<script setup>
import {ref} from"vue";
const props=defineProps({
   API_URL:
 {
   type:String,
   required:true,
 }

});
    import { showImagePreview } from 'vant';
   import {onMounted} from "vue";
   import { setHistory,gethistory ,processIssueObj} from "@/assets/js/util.js";
   const issueObjArr=ref([]);
   const load_complete=ref(false);
   const loadHistory=async()=>{
   const history=gethistory();
   console.log(history);

   if(history.length===0)
   {
      load_complete.value=true;
      return;
   }
   const validateIdArr=[];
   for(const id of history)
   {
      const response=await fetch(`${props.API_URL}issue/?id=${id}`);
      console.log(response.ok);
      const result= await response.json();
      console.log(result.status);
      if(!response.ok||result.status!=="success")
   {
      continue;
   }
   validateIdArr.push(id);
   issueObjArr.value.push(result.data);
   }
   load_complete.value=true;
   localStorage.setItem("issue-history",JSON.stringify(validateIdArr))
 }
  onMounted(async()=>{
//    issueObjArr.value=gethistory();
//    if(issueObjArr.value.length===0)
//   {
//    load_complete.value=true;
//    return ;
//   }
//   issueObjArr.value=  issueObjArr.value.map(async(id)=>{
//       const response=await fetch(`${props.API_URL}issue/?id=${id}`);
//       const result=await response.json();
//       if(!response.ok||result.status!=="success")
//    {return "";}
//    return JSON.parse(result);
//    }).filter(issueObj=>issueObj!="")
//    load_complete.value=true;

   await loadHistory();
   });
const showImages=(issueObj)=>
{  
  showImagePreview({
   
  images: JSON.parse(issueObj.image),
  closeable: true,
});
}
</script>
<style></style>