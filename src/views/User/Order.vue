<template>
  <div class="contaniner">
    <Logo>
      <span slot="name">订单中心</span>
    </Logo>
    <el-row>

<transition name="el-zoom-in-top">
<div v-show="show">
      <el-col>
        <div class="contaniner_table">
          <div class="title">
            <div class="title_name table_head">商品名称</div>
            <div class="title_img table_head">图片</div>
            <div class="title_price table_head">价格</div>
            <div class="title_remake table_head">备注</div>
            <!-- <div class="title_remake table_head">备注</div> -->
            <div class="title_endprice table_head">操作</div>
          </div>

          <div v-for="item in tableOrder" :key="item.orderId" class="yyy">
            <div class="border">
              <div class="title_person1">{{ item.orderId }}</div>
              <div class="title_person1">{{ item.orderDate }}</div>
              <div class="title_person1 money">总价￥{{ item.totalPrice }}</div>
            </div>
            <div v-for="(items,index) in tableDetail" :key="index" class="content">
              <div v-if="item.orderId==items.orderId" class="content">
                <div class="inner_table">
                  <div class="title_name table_content">{{ items.project_name }}</div>
                  <div class="title_img table_content">
                    <img :src="items.project_src" class="img" />
                  </div>
                  <div class="title_price table_content">{{ items.project_price }}</div>
                  <div class="title_remake table_content">{{ items.project_remake }}</div>

                  <div class="title_endprice table_content">
                    <el-button
                      v-if="items.status=='待付款'"
                      type="primary"
                      @click="sumbit_order(items.project_id,items.order_id,items.seller)"
                    >付款</el-button>

                    <el-button
                      v-if="items.status=='填写订单'"
                      type="primary"
                      @click="order_apprise1(items.order_id)"
                    >填写订单</el-button>
                    <el-button
                      v-if="items.status=='待发货'"
                      type="primary"
                      disabled
                      @click="order_apprise1(items.order_id)"
                    >待发货</el-button>
                    <span
                      v-if="items.status=='已完成'"
                      type="text"
                      disabled
                    >单号{{items.express_numbers}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>

</div>
</transition>


    </el-row>
    <dialog1 :dialog="dialog" @update="getPerson"></dialog1>
    <!-- <12></12> -->
  </div>
</template>

<script>
import Logo from "@/components/User/Logo.vue";
import Dialog1 from "@/components/User/Dialog.vue";
export default {
  components: { Logo, Dialog1 },
  data() {
    return {
      tableDetail: [],
      tableOrder: [],
      sum: 0,
      dialogVisible: false,

      apprise_content: "",
      dialog: {
        show: false,
        order_id: ""
      },
      f: -1,
      balance: 0,
            show:false,
    };
  },
  mounted() {
    this.renderData();
           this.show=true;
  },
  methods: {
    order_apprise1(order_id) {
      this.dialog = {
        show: true,
        order_id: order_id
      };
      // this.dialogVisible = true;
      // console.log(order_id);
      this.renderData();
    },
    order_apprise(id, order_id) {
      console.log(order_id);
      this.dialogVisible = false;
      this.renderData();
    },
    sumbit_order(project_id, order_id, seller) {
 
      var params = new URLSearchParams();
      params.append("username", this.$store.state.user.username);
      params.append("orderId", order_id);
      params.append("seller", seller);
      params.append("project_id", project_id);
      console.log(this.$store.state.user.username,order_id,seller,project_id);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/index/bs/select_balance2",
          params
        )
        .then(res => {
          console.log(res);
          // this.balance=res.data.data.balance;
          // console.log(res.data.msg);
          if (res.data.msg == 0) {
            this.$message({
              message: "付款成功",
              type: "success"
            });
                this.renderData();
          } else {
            this.$message({
              message: "余额不足",
              type: "error"
            });
          }
        });
    },
    renderData() {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.user.username);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/order", params)
        .then(res => {
          // console.log(res);
          this.tableDetail = res.data.orderDetail.dataOrder;
          this.tableOrder = res.data.order.dataOrder;
          // console.log(this.tableDetail);
        });
    },
    getPerson(order_id, apprise_name, apprise_phone, apprise_address) {
      // console.log(order_id,project_product_id,value1,apprise_content);
      // this.f=-1;
      var params = new URLSearchParams();
      params.append("apprise_name", apprise_name);
      params.append("apprise_phone", apprise_phone);
      params.append("order_id", order_id);
      params.append("apprise_address", apprise_address);
      console.log(apprise_name, order_id);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/index/bs/express_order",
          params
        )
        .then(res => {});

      this.dialog = {
        show: false,
        order_id: ""
      };
      this.renderData();
    }
  }
};
</script>

<style scoped lang="less">
.table_content {
  text-align: center;
}
.table_head {
  font-size: 20px;
  text-align: center;
}
.money {
  font-weight: bolder;
  font-size: 24px;
  color: red;
}
.img {
  width: 150px;
  height: 150px;
}
.border {
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 3px green solid;
  background: #99a9bf;
  height: 60px;
}

.title_remake {
  width: 35%;
}
.title_endprice {
  width: 20%;
}
.title_price {
  width: 10%;
}
.title_img {
  width: 20%;
}
.title_name {
  width: 15%;
}
.content {
  // clear: both;
  // border: 3px blue solid;
  width: 100%;
}
.title_person1 {
  width: 25%;
  //  border: 1px red solid;
  text-align: center;
  font-size: 18px;
  // float: left;
}
.inner_table {
  // float: left;
  display: flex;

  // flex-wrap: wrap;
}
.title {
  // border: 1px yellow solid;
  display: flex;
}
.contaniner_table {
  width: 70%;
  margin: 0 auto;
  // background: red;
  // border: 1px red solid;
}

.contaniner {
  width: 100%;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 70%;
}
</style>
