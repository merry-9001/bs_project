<template>
  <div>
    <Logo>
      <span slot="name">充值中心</span>
    </Logo>
    <el-row>
      <el-col>
        <div class="contaniner">
          <div class="pic">           <img src="../../assets/zhifu.jpg" alt /></div>
<div>
          <el-input style="width:200px" v-model="money"></el-input>
          <el-button style="margin:20px" type="primary" @click="sumbit_order()">充值</el-button>
        
        </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from "@/components/User/Logo.vue";
import Dialog1 from "@/components/User/Dialog.vue";
export default {
  components: { Logo, Dialog1 },
  data() {
    return {
      money: 0,
      tableDetail: [],
      tableOrder: [],
      sum: 0,
      dialogVisible: false,

      apprise_content: "",
      dialog: {
        show: false,
        project_product_id: "",
        order_id: "",
        orderId: ""
      },
      f: -1
    };
  },
  mounted() {},
  methods: {
    sumbit_order(order, price) {
      // console.log(id);
      var myDate = new Date();
      var mytime = myDate.toLocaleString();
      // console.log(mytime);
      var params = new URLSearchParams();
      params.append("WIDout_trade_no", mytime);
      params.append("WIDsubject", "私人订制服务");
      params.append("WIDtotal_amount", this.money);
      this.axios
        .post("/personCustom_api/pay/pagepay/pagepay.php", params)
        .then(res => {
          const div = document.createElement("div");
          div.innerHTML = res.data;
          document.body.appendChild(div);
          document.forms[0].submit();
          // console.log(res);
        });

      var params = new URLSearchParams();
      params.append("username", this.$store.state.user.username);
      params.append("WIDtotal_amount", this.money);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/money_edit", params)
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped lang="less">
.contaniner {
  display: flex;
  justify-content:center;
  align-self: center;
  width: 80%;
  // margin: 0 auto;
  flex-wrap: wrap;
  // border: 3px yellow solid;
  .pic{
    width: 100%;
     display: flex;
  justify-content:center;
  align-self: center;
  }
}
</style>
