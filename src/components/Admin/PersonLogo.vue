<template>
  <div class="container">
        <div class='aa'>
          <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>私人订制项目</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <el-table :data="tableData" style="width: 100%">

      <el-table-column label="用户名">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="进入系统时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
    </el-table-column>
    
      <el-table-column label="登录情况">
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="余额">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column> -->


    </el-table>

   
  </div>
</template>

<script>
import PersonDialog from "@/components/Admin/PersonDialog.vue";

export default {
  name: "adminIndex",
    data() {
    return {
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
      this.axios.get("/personCustom_api/PersonTp5/public/index/bs/admin_log_select").then(res => {
        console.log(res);
          this.tableData = res.data.data;
          console.log(this.tableData);
          // this.filterTableData= res.data.data.product;
          // this.setPageinations();
        
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
