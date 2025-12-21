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
</template>
<script>
  import {ref} from "vue";
       
    export default
    { name:"APPUpload",
      setup()
      {
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
        return {
          poster,
          description,
          imageArr,
          submit,
          is_submit,
          is_upload, 
       
        
        }

      }
       
    }
    

</script>
<style>

</style>