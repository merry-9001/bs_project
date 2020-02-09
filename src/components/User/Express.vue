

<template>
  <el-dialog title="请填写" :visible.sync="dialog22.show" width="30%">
    <span>请填写收货人姓名</span>
    <el-input type="text" v-model="apprise_name"></el-input>
        <span>请填写收货人电话</span>
    <el-input type="text" v-model="apprise_phone"></el-input>
        <span>请填写收货人地址</span>
    <el-input type="text" v-model="apprise_address"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit(dialog22.order_id)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      apprise_name: "",
      apprise_phone: "",
      apprise_address: ""
    };
  },
  methods: {
    onSubmit(order_id) {
      // console.log(order_id, project_product_id);
      // data={
      //   'getPerson':order_id
      // };
      this.dialog22.show = false;
      this.$emit(
        "update",
        order_id,
        this.apprise_name,
        this.apprise_phone,
        this.apprise_address,
      );
      this.apprise_name = "";
      this.apprise_phone = "";
      this.apprise_address = "";
    }
  },
  props: {
    dialog22: Object
  }
};
</script>
<style scoped lang="less">
</style>
