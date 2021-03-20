
<template>
  <div class="container">
    <!-- <el-form-item label="快递单号:" > -->
<transition name="el-zoom-in-top">
<div v-show="show">
      <div class="lean">
    快递单号:
    <el-input v-model="number" style="width:300px"></el-input>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <br />
     <br />
      <br />
    </div>
    <div class="style" v-if="flag!=0">
          <div>
            <el-tag>快递公司</el-tag>&nbsp; &nbsp; &nbsp;
            <el-tag effect="plain">{{expName}}</el-tag>
            <br />
            <el-tag>开始时间</el-tag>&nbsp; &nbsp; &nbsp;
            <el-tag effect="plain">{{takeTime}}</el-tag>
            <br />
            <el-tag>最后更新时间</el-tag>&nbsp; &nbsp; &nbsp;
            <el-tag effect="plain">{{updateTime}}</el-tag>
            <br />
          </div>
          <div>
            <div >
              <el-steps direction="vertical" >
                <el-step
                  v-for="item in  list"
                  :key="item.project_type_id"
                  :description="item.status"
                  :title="item.time"
                ></el-step>
              </el-steps>
            </div>
          </div>
      </div>
</div>
</transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      flag:0,
      list: [],
      expName: "",
      updateTime: "",
      takeTime: "",
      tableData: [],
      number: 0,
      company: "",
            show:false,
    };
  },
  mounted() {
    // this.getPerson();
           this.show=true;
  },
  methods: {
    onSubmit() {
      var params = new URLSearchParams();
      params.append("number", this.number);
      params.append("company", this.company);
      // params.append("username",row.username);
      this.axios.post("/personCustom_api/express.php", params).then(res => {
        // list:[],
        // expName:'',
        // updateTime:'',
        // takeTime:'',
        if(res.data.res.msg=='快递单号错误'){


          this.flag=0;
          this.$notify({
                title: "错误",
                message: "您的快递单号有误，请检查",
                duration: 0,
                // type: "success"
              });
        }
        else
        {
          this.flag=1;
        }

        console.log(res);
        this.expName = res.data.res.result.expName;
        this.updateTime = res.data.res.result.updateTime;
        this.takeTime = res.data.res.result.takeTime;
        this.list = res.data.res.result.list;
        console.log(this.expName);
        console.log(this.updateTime);
        console.log(this.takeTime);
        console.log(this.list);
        // this.$message({
        //   message: "操作成功",
        //   type: "success"
        // })
        // this.getPerson();
      });
    },

  }
};
</script>
<style scoped lang="less">
.lean{
    margin:0 auto;
    // border: 1px yellow solid;
    display: flex;
    align-items:center;
        justify-content:center;
}
.style{
  display: flex;
    // border: 1px yellow solid;
    justify-content:center;
}
.container {
  // display: flex;
  // border: 1px yellow solid;
  margin:0 auto;
  width: 80%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}
</style>