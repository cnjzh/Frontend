<template>
<van-form @submit="submit" v-show="!is_upload" :disabled="is_submit">
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
       max-count="5"
       />
  </template>
</van-field>

  </van-cell-group>
  <div style="margin: 16px" v-show="!is_submit">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
   </div>
    <div style="margin: 16px" v-show="is_submit">
    <van-button round block type="primary" @click.prevent="upload">
      确认提交
    </van-button>
    <br>
     <van-button round block type="normal" @click.prevent="is_submit=false">
      取消
    </van-button> 
  </div>
</van-form>
<!-- <div v-show="is_submit&&!is_upload">
    <h1 style="text-align: center">确认提交</h1>
  <div class="upload-content">
    <ul>
      <li>提交人:{{ poster }}</li>
        <li>工单描述:{{ description }}</li>
    </ul>
  <van-uploader 
  v-if="imageArr.length>0"
  v-model="imageArr"  />
  multiple

  </div>
   <van-button round block type="primary" native-type="submit">
      确定提交
    </van-button>
     <van-button round block type="default" native-type="submit">
      取消
    </van-button>

  </div> -->
<van-loading 
color="#0094ff"
size="40px"
v-show="is_upload&&!upload_complete"
class="upload-loading-spinner"
>
加载中ing
</van-loading >
<div v-show="upload_complete" class="center ">
  <h2 v-if="upload_success">上传成功，您的工单号为：{{ uploadIssueId }}</h2>
  <h2 v-else>上传失败，请重试</h2>

<van-button round block type="primary" @click.prevent="reset">继续上传</van-button>
</div>

</template>
<script setup>
  import {ref,defineProps} from "vue";
       const props=defineProps({
        API_URL:{
          type:String,
          required:true,
        }
       })

 const is_upload=ref(false);
 console.log(is_upload.value);
        const poster=ref("");
        const description=ref("");
       let imageArr=ref([]);
        
         const upload_success=ref(false);
         const uploadIssueId=ref(0);
        const is_submit=ref(false);
      
       const upload_complete=ref(false);
        const submit=()=>
{
    const  values={
      poster:poster.value,
      desc:description.value,
      imageUrl:[...imageArr.value],
      
    }
    console.log(values);
    // console.log(imageArr);
    // imageArr.value=[...imageArr.value.map((imageobj)=>imageobj.objectUrl)];

    is_submit.value=true;
  
       

      };
      const upload= async()=>
      {
        is_upload.value=true;
        var formdata = new FormData();
formdata.append("poster", poster.value);
formdata.append("description", description.value);
imageArr.value.forEach(
  (file,idx)=>
  {
    const extname=file.file.name.split(".").at(-1);
  
  formdata.append(
    "imgs",
    file.file,
    `${idx.toString().padStart(2,"0")}.${extname}`
  );}
);
// imageArr.value.forEach(
//   (image)=>
//   {
//     const extname=image.file.name.split(".").at(-1);
  
//   formdata.append(
//     "imgs",
//     file.file,
//     `${idx.toString().padStart(2,"0")}.${extname}`
//   );}
// );

 
// formdata.append("img", fileInput.files[0], "D:\Users\Lenovo\Desktop\6157e83b20921404eee4c6d4dd5f192a.jpg");
// formdata.append("img", fileInput.files[0], "D:\Users\Lenovo\Desktop\pubviz - keep.pdf");
      const response= await fetch(`${props.API_URL}issue`,
          {
            method:"POST",
            body:formdata,
          }
        );

  const result=await response.json();
       upload_complete.value=true;
  if(!response.ok||result.status!=="success")
  {

    return;
  }
  upload_success.value=true;
  uploadIssueId.value=result.data.id
  
      }
      const reset=()=>
      {
       poster.value="";
       description.value="";
       imageArr.value=[];
       is_submit=false;
       is_upload.value=false;
       upload_complete=false;
       upload_success=false;
       uploadIssueId.value=0;
      }
       
    
    

</script>
<style scoped>
  .upload-loading-spinner
  {
    text-align: center;
    margin-top: 40px;
  }
.center 
{
      text-align: center;
}

</style>