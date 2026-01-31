<template>
    
    <van-form @submit="login" v-show="!login_success":disabled="is_login">
  <van-cell-group inset>
    <van-field
      v-model.lazy.trim="staffName"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model.lazy.trim="password"
      name="密码"
      label="密码"
      type="password"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    

  </van-cell-group>
  <div  class="btn-margin" v-show="!is_submit">
    <van-button round block type="primary" native-type="submit" :disabled="is_login">
      登录
    </van-button>
   </div>

   <van-loading 
color="#0094ff"
size="40px"
v-show="is_login&&!login_complete"
class="upload-loading-spinner"
>
加载中ing
</van-loading >

   
</van-form>
<app-admin-content   v-if="is_admin===true"></app-admin-content>
   <!-- <div v-show="login_success">登陆成功</div> -->
</template>

<script setup>
import {ref}from "vue";
import AppAdminContent  from "./AdminContent.vue";
const emit=defineEmits(["loginsucess"])
const is_admin=ref(false)
const staffName=ref("");
const password=ref("");
const is_login=ref(false);
const login_success=ref(false);
const login_complete=ref(false);
const props=defineProps({
    API_URL:
    {
        type:String,
        required:true,
    }
})
const login=async ()=>{
 is_login.value=true;
 const response= await fetch(`${props.API_URL}staff?staffName=${staffName.value}&password=${password.value}`);

   const result= await response.json();
 login_complete.value=true;
 console.log(response.ok);
 console.log(result.status);
 if(!response.ok||result.status!="success"){
    alert("请输入正确的用户名和密码");
    resetLogin();

    return ;

 }
 login_success.value=true;
 is_admin.value=result.data.staffRole==="admin" ;
 emit("loginSuccess");
}
const resetLogin=()=>
{
is_login.value=false;
login_complete.value=false;
login_success.value=false;
staffName.value="";
password.value=""; 
is_admin.value=false;
}
</script>
<style></style>