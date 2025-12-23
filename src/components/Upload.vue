<template>
<van-form @submit="submit" v-show="!is_submit">
  <van-cell-group inset>
    <van-field
      v-model.lazy.trim="poster"
      name="提交人"
      label="提交人"
      placeholder="提交人"
      :rules="[{ required: true, message: '请填写提交人' }]"
    />
    <van-field
      v-model.lazy.trim="description"
      name="工单描述"
      label="工单描述"
      placeholder="工单描述"
      :rules="[{ required: true, message: '请填写工单描述' }]"
    />
     <van-field name="uploader" label="添加图片">
  <template #input  >
    <van-uploader 
    v-model="imageArr"
     accept="image/*"
      multiple="true"
       max-size="1024*1024*10" 
       max-count="2"
       />
  </template>
</van-field>

  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
<div v-show="is_submit&&!is_upload">
    <h1 style="text-align: center">确认提交</h1>
  <div class="upload-content">
    <ul>
      <li>提交人:{{ poster }}</li>
        <li>工单描述:{{ description }}</li>
    </ul>
  </div>
   <van-button round block type="primary" native-type="submit">
      确定提交
    </van-button>
     <van-button round block type="default" native-type="submit">
      取消
    </van-button>

  </div>
</template>
<script setup>
  import {ref} from "vue";
       

     
        const poster=ref("");
        const description=ref("");
        const imageArr=ref([]);
        const tel = ref('');
    const name = ref('');
        const is_submit=ref(false);
        const is_upload=ref(false);

        const submit=()=>
{
    const  values={
      poster:poster.value,
      desc:description.value,
      imageUrl:[...imageArr.value],
      
    };
    console.log(values);

    is_submit.value=true;
  
       

      }
       
    
    

</script>
<style>
.upload-content
{text-align: left;}
  

</style>