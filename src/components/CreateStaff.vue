<template>
    <!--create staff form-->
    
  <van-form @submit="submit"   >
     <van-cell-group inset>
    <van-field
      v-model.lazy.trim="staffName"
      name="员工姓名"
      label="员工姓名"
      placeholder="员工姓名"
      :rules="[{ required: true, message: '请填写员工姓名' }]"
    />
    <van-field
      v-model.lazy.trim="password"
      name="密码"
      type="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />


  </van-cell-group>
           <van-button 
         type="success" 
         round block 
            native-type="submit"
   
         class="btn-margin" >
         创建员工
        </van-button>
       
         </van-form>
          <van-loading 
color="#0094ff"
size="40px"
v-show="is_submit"
class="upload-loading-spinner"
>
加载中ing
</van-loading >
</template>

<script setup>
import {ref} from "vue";
import config from "@/assets/js/config";
const is_submit=ref(false);
const {API_URL}=config;
const staffName=ref("");
const password=ref("");
 const submit_complete=ref(false);
const submit=async ()=>
{
    is_submit.value=false;
const response=await fetch(`${API_URL}staff`,{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({  
    staffName:staffName.value,
    password:password.value}
  
   ) 
}
);
const result=await response.json();
if(!response.ok||result.status!="success")
{
    alert("创建失败");

    return ;
}

alert("创建成功");
staffName.value="";
password.value="";

}

</script>

<style >

</style>