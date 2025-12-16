<template>
<van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="poster"
      name="提交人"
      label="提交人"
      placeholder="提交人"
      :rules="[{ required: true, message: '请填写提交人' }]"
    />
    <van-field
      v-model="description"
      name="工单描述"
      label="工单描述"
      placeholder="工单描述"
      :rules="[{ required: true, message: '请填写工单描述' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

</template>
<script>
    export default
    {
        name:"APPUpload",
    }
    

</script>
<style>

</style>