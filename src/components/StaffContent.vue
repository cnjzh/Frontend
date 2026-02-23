<template>
  

<div  class="center" >
    <div v-if="issueObjArr.length>0">历史工单数量{{ issueObjArr.length   }}
      <div v-for="issueObj in issueObjArr">
          <van-list>
  <van-cell v-for="item in processIssueObj(issueObj)" :key="item" :title="item" /><van-divider />
</van-list>
<div class="btn-margin" ><van-button round block type="primary" @click.prevent="showImages(issueObj)" >查看图片</van-button>
<br>

    <!-- <van-button round block type="success"  @click.prevent="assignStaff" >分配负责人</van-button> -->
    

    <van-button type="success" round block @click.prevent="completeIssue(issueObj.id)"  v-if="issueObj.state=='fixing'">完成工单</van-button>



</div>
<van-divider />


      </div>
         
    </div>
    <h3 v-else class="center">未找到历史工单</h3>
</div>

 
   

</template>

<script setup>
import Config from "../assets/js/config.js"
   import {onMounted} from "vue";
import {ref} from"vue";
    import { showImagePreview } from 'vant';

    
import { processIssueObj,converTimestampToISOString} from "@/assets/js/util.js";
const show_staff_list=ref(false);
const props=defineProps({ 
    staffId:
    {
        type:Number,
        required:true,
    },
})
   


const {API_URL} =Config;
const issueObjArr=ref([]);

const showImages=(issueObj)=>
{
  showImagePreview({
  images: JSON.parse(issueObj.image),
  closeable: true,
});
}
const completeIssue=async(issueId)=>
{
     const response=await fetch(`${API_URL}issue`,
        {method:"PATCH",
            headers:
            {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                id:issueId,
                staffId:props.staffId,
            })
        }
     )
     const result= await response.json();
     if(!response.ok||result.status!=="success")
     {
        alert("工单完成请求失败");
        return ;
     }
     alert(`完成工单：${issueId}`);
     const idx=issueObjArr.value.findIndex((issue)=>issue.id==issueId);
     issueObjArr.value[idx].state="complete";
     issueObjArr.value[idx].fixedDate=converTimestampToISOString(Date.now());

};
const loadIssueList=async()=>{
 const response=await fetch(`${API_URL}issue`);
    const result= await response.json();
    if(!response.ok||result.status!=="success")
{
    alert("加载工单失败");
    return ;
}
    issueObjArr.value=result.data.filter((issue)=>issue.staffId==props.staffId);
}


//TODO backend updata Issue has problems

onMounted(async() => {
    loadIssueList();
 
})



</script>

<style >

</style>