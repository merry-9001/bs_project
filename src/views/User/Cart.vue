<template>
  <div class="contaniner">
    <Logo>
      <span slot="name">购物车</span>
    </Logo>
    <el-row>
<transition name="el-zoom-in-top">
<div v-show="show">


      <el-col>
        <div class="table_con">
          <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="项目序号">
                    <span>{{ props.row.project_id }}</span>
                  </el-form-item>
                  <el-form-item label="项目介绍">
                    <span>{{ props.row.project_introduce }}</span>
                  </el-form-item>
                  <el-form-item label="项目备注">
                    <span>{{ props.row.project_remake }}</span>
                  </el-form-item>
                  <el-form-item label="价格">
                    <span>{{ props.row.project_price }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="图片" width="200">
              <template slot-scope="scope">
                <img :src="scope.row.project_src " class="img" />
              </template>
            </el-table-column>
            <el-table-column prop="project_name" label="商品" width="150">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column prop="project_price" label="最终价格" width="150"></el-table-column>
            <el-table-column prop="project_remake" label="备注"></el-table-column>
            <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
    </el-table-column>
          </el-table>
          <div class="pay">
            <span>¥{{sum}} &nbsp;&nbsp;</span>
            <el-button @click="speedupData()">下单</el-button>
          </div>
        </div>
      </el-col>

</div>
</transition>

    </el-row>
  </div>
</template>

<script>
import Logo from "@/components/User/Logo.vue";
export default {
  components: { Logo },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      sum:0,
            show:false,
    };
  },
  mounted() {
    this.renderData();
           this.show=true;
  },
  methods: {

    handleSelectionChange(val) {
              // this.$refs.multipleTable.clearSelection();
      this.multipleSelection = val;
      // console.log(val);
      var arr = this.multipleSelection;
      // console.log(arr);
      let multis = [];
      this.sum=0;
      for (var i = 0; i < arr.length; i++) {
        this.sum=this.sum+arr[i].project_price;
        // console.log(arr[i]);
        // console.log(this.sum);
      }
    },
    speedupData() {
      var arr = this.multipleSelection;
      let multis = [];
      let proId = [];
      let seller = [];
      for (var i = 0; i < arr.length; i++) {
        multis.push(arr[i].cart_id);
        proId.push(arr[i].project_id);
        seller.push(arr[i].username);
      }
      // console.log(multis);
      var params=new URLSearchParams();
      params.append("seller", seller);
      params.append("cart", multis);
      params.append("proId", proId);
      params.append("sum", this.sum);
      params.append("username", this.$store.state.user.username);
      this.axios.post("/personCustom_api/PersonTp5/public/index/bs/cart_submit",params)
      .then(res=>{
        console.log(res);
        //     this.renderData();
         this.$router.push('/order');
      })
      // console.log(multis);

      // console.log(ss);
    },
    handleDelete(index, row){
        console.log(index,row);
        // console.log(row.username);
        var params = new URLSearchParams();
        params.append("username", this.$store.state.user.username);
        params.append("cart_id", row.cart_id);
        this.axios.post("/personCustom_api/PersonTp5/public/index/bs/cart_delete",params).
        then(res=>{
          console.log(res);
        });

        // renderData();
        this.renderData();
    },
    renderData(){
    var params = new URLSearchParams();
    params.append("username", this.$store.state.user.username);
    this.axios
      .post("/personCustom_api/PersonTp5/public/index/bs/cart", params)
      .then(res => {
        console.log(res);
        this.tableData = res.data.data.cart;
        console.log(this.tableData);
      });
    }
  }
};
</script>

<style scoped lang="less">
.pay{
  margin-top: 20px;
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size: 20px;
  color: red;
  font-weight: bolder;
}
.img {
  width: 150px;
  height: 150px;
}
.table_con {
  width: 60%;
  margin: 0 auto;
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
