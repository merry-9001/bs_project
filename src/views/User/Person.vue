<template>
  <div>
    <Logo>
      <span slot="name">个人中心</span>
    </Logo>
    <el-row  class="inline">
      <el-col>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="店铺" name="store">
            <el-form :inline="true">
              <el-form-item class="btnRight">
                <el-button type="primary" size="small" @click="handleAdd()">添加商品</el-button>
              </el-form-item>
            </el-form>

            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="项目名称">
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span>{{ scope.row.project_name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="价格">
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span>¥{{ scope.row.project_price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="介绍">
                <template slot-scope="scope">
                  <span>{{ scope.row.project_introduce }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                  <span>{{ scope.row.project_remake }}</span>
                </template>
              </el-table-column>
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.project_src" class="head" />
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    v-if="scope.row.rs_status=='-1'"
                    size="mini"
                    type="success"
                    @click="handleDelete1(scope.$index, scope.row)"
                  >上架</el-button>
                  <el-button
                    v-else-if="scope.row.rs_status=='0'"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >下架</el-button>
                 <el-button
                    v-else
                    size="mini"
                    disabled
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >售出</el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
         <el-tab-pane label="店铺订单" name="third">
          

        <el-table :data="tableData_express" style="width: 100%">
          <el-table-column label="商品">
            <template slot-scope="scope">
              <span>{{ scope.row.project_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单时间">
            <template slot-scope="scope">
              <span>{{ scope.row.orderDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="快递地址">
            <template slot-scope="scope">
              <span>{{ scope.row.express_address }}</span>
            </template>
            </el-table-column>
          <el-table-column label="联系人电话">
            <template slot-scope="scope">
              <span>{{ scope.row.express_phone }}</span>
            </template>
            </el-table-column>
                      <el-table-column label="收件人">
            <template slot-scope="scope">
              <span>{{ scope.row.express_name }}</span>
            </template>
            </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div v-if="scope.row.status=='待发货'">
              <el-button size="mini" @click="fill_express( scope.row)">填写单号</el-button>
          </div> 
              <div v-if="scope.row.status=='已完成'">
              <el-button size="mini" disabled>已完成</el-button>
          </div> 


            </template>
          </el-table-column>
        </el-table>

         </el-tab-pane>
          <el-tab-pane label="个人信息" name="person">个人信息</el-tab-pane>
         
          <el-tab-pane label="定时任务补偿" name="fourth">askfjsalkf</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <PersonDialog :dialog="dialog" :formData="formData" @func="getMsgFormSon" @update="getPerson"></PersonDialog>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <span>请填写您寄出的快递单号</span>
  <span slot="footer" class="dialog-footer">
    <el-input type="text" v-model="express_number"></el-input>
    <el-button type="primary" @click="fill_express_sumbit()">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import Logo from "@/components/User/Logo.vue";
import PersonDialog from "@/components/User/PersonDialog.vue";
export default {
  data() {
    return {
      tableData: [],
      tableData_express:[],
      dialog: {
        show: false,
        title: "",
        option: ""
      },
      express_number:'',
      dialogVisible:false,
      formData: {
        project_name: "",
        project_price: "",
        project_introduce: "",
        project_remake: "",
        project_src: ""
      },
      activeName: "second",
      order_id:""
    };
  },

  created() {
    this.getPerson();
    
    this.getPerson_express();
  },
  methods: {
    fill_express_sumbit(){
       this.dialogVisible = false;
       let s=this.express_number;
      console.log(this.order_id,this.express_number)
      this.express_number="";

      var params = new URLSearchParams();
      params.append("express_number",s);
      params.append("order_id",this.order_id);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/express_sumbit", params)
        .then(res => {

            this.$message({
              message: "已完成",
              type: "success"
            })
            this.getPerson_express();
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialog = {
        show: true,
        title: "修改项目",
        option: "edit"
      };
      this.formData = {
        project_name: row.project_name,
        project_price: row.project_price,
        project_introduce: row.project_introduce,
        project_remake: row.project_remake,
        project_src: row.project_src,
        project_id: row.project_id
      };
    },
    handleDelete1(index, row) {
      console.log(row.project_id);
      var params = new URLSearchParams();
      params.append("project_id", row.project_id);
      params.append("username", this.$store.state.user.username);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/shop_open", params)
        .then(res => {
          // var state = res.data.stauts;
          // console.log(res);
          // if (state === "ok") {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.getPerson();
          // }
        });
    },
    handleDelete(index, row) {
      console.log(row.project_id);
      var params = new URLSearchParams();
      params.append("project_id", row.project_id);
      params.append("username", this.$store.state.user.username);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/shop_close", params)
        .then(res => {
          // var state = res.data.stauts;
          console.log(res);
          // if (state === "ok") {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.getPerson();
          // }
        });
    },
    getPerson() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/shop_select?id="+this.$store.state.user.username)
        .then(res => {
          // console.log(res);
          // var msg = res.data.msg;
          // if (msg === "ok") {
          this.tableData = res.data.data;
          // console.log(this.tableData);
          // this.filterTableData= res.data.data.product;
          // this.setPageinations();
          // }
        });
      // console.log('asds');
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加项目",
        option: "add"
      };
      this.formData = {
        project_name: "",
        project_price: "",
        project_introduce: "",
        project_remake: "",
        project_src: "",
        project_id: ""
      };
    },
    getMsgFormSon(data) {
      // console.log(this.formData.project_src);
      this.formData.project_src =
        "http://47.96.175.28/personCustom_api/images/user/person/" + data;
      // console.log(this.formData.project_src);
    },
    getPerson_express() {
      this.axios.get("/personCustom_api/PersonTp5/public/index/bs/express_select?id="+this.$store.state.user.username).then(res => {
        console.log(res);
          this.tableData_express = res.data.data;
          // console.log(this.tableData_express);
      });
      // console.log('asds');
    },
    fill_express(row) {
      this.dialogVisible = true;
      this.order_id=row.order_id;




    },

  },
  components: {
    PersonDialog,
    Logo,
  }
};
</script>
<style scoped lang="less">

img {
  width: 200px;
  height: 150px;
}
.inline {
  width: 70%;
  margin: 0 auto;
}
</style>