<template>
  

<div  class="center"  v-show="!show_staff_list">
    <h3 v-if="issueObjArr.length>0">历史工单数量{{ issueObjArr.length   }}
      <div v-for="issueObj in issueObjArr">
          <van-list>
  <van-cell v-for="item in processIssueObj(issueObj)" :key="item" :title="item" /><van-divider />
</van-list>
<div class="btn-margin" ><van-button round block type="primary" @click.prevent="showImages(issueObj)" >查看图片</van-button>
<br>

    <!-- <van-button round block type="success"  @click.prevent="assignStaff" >分配负责人</van-button> -->
    

    <van-button type="success" round block @click.prevent="goToAssign(issueObj.id)"  v-if="issueObj.state=='wait'">分配负责人</van-button>



</div>
<van-divider />


      </div>
         
    </h3>
    <h3 v-else class="center">未找到历史工单</h3>
</div>

 <van-list v-show="show_staff_list">
    <div v-for="staff in staffArr" :key="staff.staffName"  class="btn-margin" >
        <van-cell 
         v-if="staff.staffRole=='staff'"
         v-for="item in processStaffObj(staff)"
        :title="item"  
        :key="item"
        
       />
        <!-- <van-cell  v-for="item in Object.values(staff)":title="item"  /> -->
         <van-button 
         type="success" 
         round block 
         @click.prevent="assignStaff(staff.id)"  
        v-if="staff.staffRole=='staff'"
         class="btn-margin" >
         选择 负责人
        </van-button> 
        <van-divider />
    </div>
    </van-list>
   

</template>

<script setup>
import Config from "../assets/js/config.js"
   import {onMounted} from "vue";
import {ref} from"vue";
    import { showImagePreview } from 'vant';
import { processIssueObj } from "@/assets/js/util.js";
const show_staff_list=ref(false);


const {API_URL} =Config;
const issueObjArr=ref([]);
const showPopover=ref("");
const staffArr=ref([]);
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
    alert("加载工单失败");
    return ;
}
    issueObjArr.value=(result.data);
}
const loadStaffList=async()=>{
 const response=await fetch(`${API_URL}staff`);
    const result= await response.json();
    console.log(2222);
       console.log(response.ok);
 
    console.log(result.status);
    if(!response.ok||result.status!=="success")
{
    alert("加载员工信息失败");
    return ;
}
    staffArr.value=result.data;
}
const goToAssign=(id)=>
{
    assignStaffId.value=id;
    show_staff_list.value = true;
}
//TODO backend updata Issue has problems
const assignStaff= async (id)=>{
   const response=await fetch(`${API_URL}issue`,
        {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify( {
                id:assignIssueId.value,
                staffId:id,
                adminId:1,
            }),
           
        }
    )
    const result=await response.json();
    if(!response.ok||result.status!=="sucess")
    {alert("分配负责人失败，请重试");
        return ;
    }
    alert("分配负责人成功");
    show_staff_list=false;
   const idx= issueObjArr.value.findIndex((issueObj)=>issueObj.id==assignIssueId.value);
   issueObjArr.value[idx].state="fixing";
}
onMounted(async() => {
    loadIssueList();
    loadStaffList();
})
const assignIssueId=ref(0);
const assignStaffId=ref(0);
const processStaffObj=(staff)=>
{
    const res=[];
    res.push(`员工号:${staff.id}`);
    res.push(`员工:${staff.staffName}`);
    return res;

}
</script>

<style >

</style>