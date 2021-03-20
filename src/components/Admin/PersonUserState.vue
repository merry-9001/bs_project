<template>
  <div class="container">
        <div class='aa'>
          <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>私人订制项目</el-breadcrumb-item>
        <el-breadcrumb-item>顾客管理</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <el-table :data="tableData" style="width: 100%">

      <el-table-column label="用户名">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.register_time }}</span>
        </template>
    </el-table-column>
    
      <el-table-column label="介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.Introduction }}</span>
        </template>
      </el-table-column>
      <el-table-column label="余额">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">

          <div v-if="scope.row.freeze==1">
             <el-button  size="mini" @click="handleEdit(scope.row)">冻结</el-button>
            </div>
            <el-button  v-else type="danger" size="mini" @click="handleEdit1(scope.row)">解冻</el-button>
         
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import PersonDialog from "@/components/Admin/PersonDialog.vue";

export default {
  name: "adminIndex",
    data() {
    return {
      shopData:[],
      tableData:[],
      currentPage : 1,
      pageSize : 3,
      dialog:{
        show: false,
        title: "",
        option: ""
      },
      formData: {
        project_name: "",
        project_price: "",
        project_introduce: "",
        project_remake: "",
        project_src: "",
        project_id: "",
      },
    };
  },
  created() {
    this.getPerson();
  },
  methods: {
    handleEdit(row) {
      var params = new URLSearchParams();
      params.append("username",row.username);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/admin_user_freeze_open", params)
        .then(res => {
              this.$message({
                message: '冻结成功',
                type: 'success'
              });
            this.getPerson();
          // }
        });
    },
    handleEdit1(row) {

      var params = new URLSearchParams();
      params.append("username",row.username);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/admin_user_freeze", params)
        .then(res => {
              this.$message({
                message: '解冻成功',
                type: 'success'
              });
            this.getPerson();
          // }
        });

      // console.log(row);
    },

    handleDelete(index, row) {
      console.log(row.project_id);
      var params = new URLSearchParams();
      params.append("id",row.project_id);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/resource_edit_cancel", params)
        .then(res => {
          var state = res.data.stauts;
          console.log(res);
          if (state === "ok") {
            this.$message({
              message: "已取消，无法回答",
              type: "success"
            });
            this.getPerson();
          }
        });
    },
    getPerson() {
      this.axios.get("/personCustom_api/PersonTp5/public/index/bs/admin_user_select").then(res => {
        console.log(res);
          this.tableData = res.data.data;
          console.log(this.tableData);
      });

      this.axios.get("/personCustom_api/PersonTp5/public/index/bs/admin_admin_select").then(res => {
        // console.log(res);
        this.shopData=res.data.data;
          // this.tableData = res.data.data;
          // console.log(res);
      });

      // console.log('asds');
    },

    getMsgFormSon(data){
        console.log(this.formData.project_src);
        this.formData.project_src='http://localhost:8000/personCustom_api/images/admin/person/'+data;
        console.log(this.formData.project_src);
    },
    handleSearch2(){
      console.log(this.search_data.content);
    }
  },

  components: {
    PersonDialog
  }
};
</script>
<style scoped lang="less">
.center{
    display: flex;
  justify-content: center;
  // flex-wrap: wrap;
    border: 1px solid red;
    // width:50%;
}
.aa{
  padding: 1rem;
  // border: 1px solid red;
}
.page{
  text-align: center;
}
img{
  width: 100px;
  height: 100px;
}
.btnRight {
  float: right;

}

.container{

  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}
</style>
