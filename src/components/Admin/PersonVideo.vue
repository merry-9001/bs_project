<template>
  <div class="container">
        <div class='aa'>
          <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>私人订制项目</el-breadcrumb-item>
        <el-breadcrumb-item>视频审核</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <el-table :data="tableData" style="width: 100%">

      <el-table-column label="视频名称">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span>{{ scope.row.video_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="视频类型">
        <template slot-scope="scope">
          <span>{{ scope.row.video_type_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="播放量">
        <template slot-scope="scope">
          <span>{{ scope.row.video_number }}</span>
        </template>
    </el-table-column>
    
              <el-table-column label="图片">
                <template slot-scope="scope">
                  <img :src="scope.row.video_pic" class="head" />
                </template>
              </el-table-column>

      <!-- <el-table-column label="介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.video_pic }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="余额">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column> -->


      <el-table-column label="操作">
        <template slot-scope="scope">

          <div v-if="scope.row.video_state==0">
             <el-button  size="mini" @click="handleEdit(scope.row)">下架</el-button>
            </div>
            <el-button  v-else type="danger" size="mini" @click="handleEdit1(scope.row)">通过</el-button>
         
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
      params.append("video_id",row.video_id);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/admin_video_freeze_open", params)
        .then(res => {
              this.$message({
                message: '下架成功',
                type: 'success'
              });
            this.getPerson();
          // }
        });
    },
    handleEdit1(row) {
      var params = new URLSearchParams();
      params.append("video_id",row.video_id);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/admin_video_freeze_close", params)
        .then(res => {
              this.$message({
                message: '已成功上线',
                type: 'success'
              });
            this.getPerson();
          // }
        });

      // console.log(row);
    },
    getPerson() {
      this.axios.get("/personCustom_api/PersonTp5/public/index/bs/admin_video_select").then(res => {
        console.log(res);
          this.tableData = res.data.data;
          console.log(this.tableData);
          // this.filterTableData= res.data.data.product;
          // this.setPageinations();
        
      });
      // console.log('asds');
    },

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
