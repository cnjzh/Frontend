<template>
 
<van-form @submit="onSubmit" v-show="!is_query">
  <van-cell-group inset>
    <van-field
      v-model="issueId"
      name="工单号"
      label="工单号"
      placeholder="工单号"
      :rules="[{ required: true, message: '请填写工单号' }]"
    />

  </van-cell-group>
  <div  class="btn-margin" >
    <van-button round block type="primary" native-type="submit">
      查询
    </van-button>
  </div>
</van-form>
<van-loading 
color="#0094ff"
size="40px"
v-show="is_query&&!query_complete"
class="upload-loading-spinner"
>
加载中ing
</van-loading >
<div v-show="query_complete" class="center ">
  <div v-if="query_success">
     <h2 v-if="query_success">查询成功 </h2>
    <van-list>
  <van-cell v-for="item in processIssueObj(issueObj)" :key="item" :title="item" />
</van-list>
<div class="btn-margin" ><van-button round block type="primary" @click.prevent="showImages" >查看图片</van-button>
<br>
<van-button round block type="normal"  @click.prevent="reset">继续查询</van-button></div>

</div>
 

 
  <div v-else  class="btn-margin" >
    <h3 class="center">查询失败，请重试</h3>
    <van-button round block type="normal"  @click.prevent="reset">继续查询</van-button>
  </div>


</div>


</template>
<script setup>
    import {ref,defineProps} from "vue";
    import {processIssueObj}from "../assets/js/util.js";
        const is_query=ref(false);
    const query_complete=ref(false);
    const query_success=ref(false);
    const props=defineProps({
        API_URL:
        {
            type:String,
            required:true,
        }
    })
    const issueId = ref('');
    const issueObj=ref({});
    const onSubmit =async (values) => {
        is_query.value=true;
      console.log('submit', values);
      const response=await fetch(`${props.API_URL}issue/?id=${issueId.value}`);
      const result=await response.json();
      query_complete.value=true;
      console.log(response.ok);
      console.log(result.status)
      if(!response.ok||result.status!="success")
    {
      return ;
    }
    query_success.value=true;
    console.log(result);
     issueObj.value=result.data;
    };
    const reset=()=>
    {
      is_query.value=false;
      issueId.value="";
      query_complete.value=false;
      query_success.value=false;
      issueObj.value={};
    }
   import { showImagePreview } from 'vant';
const showImages=()=>
{
  showImagePreview({
  images: JSON.parse(issueObj.value.image),
  closeable: true,
});
}
 



</script>
<style></style>