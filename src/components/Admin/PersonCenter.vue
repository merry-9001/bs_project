<template>
  <div class="container">
        <div class='aa'>
          <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>私人订制项目</el-breadcrumb-item>
        <el-breadcrumb-item>资源链接</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <el-table :data="nowTableData" style="width: 100%">
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.project_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span>{{ scope.row.project_name }}</span>
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
            <el-table-column  label="图片" >
          <template slot-scope="scope">
              <img :src="scope.row.project_src" class="head">
              </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.rs_status==0">
             <el-button  size="mini" @click="handleEdit(scope.$index, scope.row)">解答</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">取消</el-button>
            </div>
            <el-button disabled v-else  size="mini" @click="handleEdit(scope.$index, scope.row)">已完成</el-button>
        </template>
      </el-table-column>
    </el-table>

        <el-pagination class="page"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="tableData.length">
        </el-pagination>
    <PersonDialog :dialog="dialog" :formData="formData" @func="getMsgFormSon" @update="getPerson"></PersonDialog>
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
    handleEdit(index, row) {
      console.log(index, row);
      this.dialog = {
        show: true,
        title: "资源",
        option: "edit"
      };
      this.formData = {
        project_name: row.project_name,
        project_price: row.project_price,
        project_introduce: row.project_introduce,
        project_remake: row.project_remake,
        project_src: row.project_src,
        project_id: row.project_id,
      };
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
      this.axios.get("/personCustom_api/PersonTp5/public/index/bs/adminResource_select").then(res => {
        console.log(res);
          this.tableData = res.data.data;
          console.log(this.tableData);
          // this.filterTableData= res.data.data.product;
          // this.setPageinations();
        
      });
      // console.log('asds');
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加项目",
        option: "add"
      };
      this.formData={
        project_name: "",
        project_price: "",
        project_introduce: "",
        project_remake: "",
        project_src: "",
        project_id: "",
      }
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
  },
    computed:{
        nowTableData(){
            return this.tableData.slice( (this.currentPage - 1)*this.pageSize , this.currentPage*this.pageSize ) || [];
        }
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
