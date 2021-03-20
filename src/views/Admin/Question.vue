
<template>
  <div class="container">
    <el-table :data="tableData1" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="问题Id">
              <span>{{ props.row.quetion_id }}</span>
            </el-form-item>

            <el-form-item label="提问用户">
              <span>{{ props.row.username }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="问题" prop="quetion_introduce"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state==0" size="mini" @click="handleEdit(scope.row)">回答</el-button>
        </template>
      </el-table-column>
    </el-table>
    <QuestionDlog :dialog="dialog" @update="getPerson"></QuestionDlog>
  </div>
</template>

<script>
import QuestionDlog from "@/components/Admin/QuestionDlog.vue";
export default {
  components: { QuestionDlog },
  data() {
    return {
      tableData1: [],
      dialog: {
        show: false,
        id: "",
        question: ""
      }
    };
  },
  mounted() {
    this.render();
  },
  methods: {
    handleEdit(row) {
      this.dialog = {
        show: true,
        id: row.quetion_id,
        question: row.quetion_introduce
      };
      // console.log(row);
    },
    getPerson(id, slove1) {
      var params = new URLSearchParams();
      params.append("question_id",id);
      params.append("solve_content1", slove1);
      this.axios
        .post("/personCustom_api/PersonTp5/public/index/bs/question_sumbit",params)
        .then(res => {
          console.log(id);
          console.log(res);
        });
          this.render();
    },
    render(){
    this.axios
      .get("/personCustom_api/PersonTp5/public/index/bs/question_select_admin")
      .then(res => {
        //   console.log(res);
        this.tableData1 = res.data.data;
        console.log(this.tableData1);
      });
    }
  }
};
</script>
<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
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
  width: 50%;
}
</style>
