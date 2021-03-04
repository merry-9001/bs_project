<template>
  <div class="container">
        <div class='aa'>
          <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>私人订制项目</el-breadcrumb-item>
        <el-breadcrumb-item>数据库备份</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
      <el-input v-model="number" style="width:300px"></el-input>
         <el-button type="primary" @click="onSubmit1">备份</el-button>

               <!-- <el-button type="primary" @click="reply">还原</el-button> -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.data_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="380">
        <template slot-scope="scope" >
          <!-- <i class="el-icon-time"></i> -->
          <span>{{ scope.row.data }}</span>
        </template>
      </el-table-column>

      <el-table-column label="备份时间">
        <template slot-scope="scope">
          <span>{{ scope.row.data_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remake }}</span>
        </template>
     </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">

          <!-- <div v-if="scope.row.freeze==1"> -->
             <el-button  size="mini" @click="reply(scope.row)">还原</el-button>
            <!-- </div> -->
            <!-- <el-button  v-else type="danger" size="mini" @click="handleEdit1(scope.row)">解冻</el-button> -->
         
        </template>
      </el-table-column>
    </el-table>

    
  </div>
</template>

<script>


export default {
  name: "adminIndex",
    data() {
    return {
      number:'',
      url:'',
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

     onSubmit1() {
      // var params = new URLSearchParams();
      // params.append("number", this.number);
      // params.append("company", this.company);
      // params.append("username",row.username);
      this.axios.get("/personCustom_api/copy_databse.php").then(res => {
        // console.log(res.data.data);
        // this.url=res.data.data;


    this.url='http://localhost:8000/personCustom_api/'+res.data.data;


        var params=new URLSearchParams();
        params.append("url",this.url);
        params.append("number", this.number);
 params.append("data", res.data.data);
    this.axios.post("/personCustom_api/PersonTp5/public/index/bs/database_add",params)
    .then(res=>{
      console.log(res);

              this.$notify({
          title: '备份',
          message: '备份成功',
          duration: 0
        });
        this.number='';
              this.getPerson();
    })

  
        
      });

    },
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

    getPerson() {
      this.axios.get("/personCustom_api/PersonTp5/public/index/bs/database_select").then(res => {
        console.log(res);
          this.tableData = res.data.data;
          console.log(this.tableData);
          // this.filterTableData= res.data.data.product;
          // this.setPageinations();
        
      });
      // console.log('asds');
    },
   
    reply(row) {
              var params=new URLSearchParams();
        params.append("url",row.data);
      this.axios.post("/personCustom_api/reply_databse.php",params).then(res => {
        console.log(res);
         this.$notify({
          title: '操作',
          message: res.data,
          duration: 0
        });
        
      });
      // this.getPerson();
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
