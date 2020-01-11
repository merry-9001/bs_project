<template>
  <div>
    <Logo>
      <span slot="name">视频中心</span>
    </Logo>
    <el-row class="row-mobile">
      <el-col :xs="24" :lg="8">
        <div class="col_center1">
          <el-input placeholder="搜索" v-model="input" clearable maxlength="10" width="100"></el-input>
          <el-button @click="search()" icon="el-icon-search"></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-mobile">
      <el-col :xs="24" :lg="8">
        <div class="col_center1">
          <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;margin-top:20px;">
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="right">right</el-radio-button>
            <el-radio-button label="bottom">bottom</el-radio-button>
            <el-radio-button label="left">left</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="row-content row-mobile">
      <el-col :xs="24" :lg="6">
    
        <div class="box"  @click="ToDetail()">
 
            <img class="video-img" src="http://47.96.175.28/personCustom_api/images/user/index/l1.jpg" alt="">
            <span> 打算科技爱丽打算科技爱丽打算科技爱丽</span>
            <br>
            <span>saf</span>&nbsp;&nbsp;<span>saf</span>

        </div>
      </el-col>

            <el-col :xs="24" :lg="6">
        <div class="box">
            
            <img class="video-img" src="http://47.96.175.28/shopping_api/images/photo/jujingyi.jpeg" alt="">
                   <span> 打算科技爱丽</span>
            </div>
      </el-col>
            <!-- <el-col :xs="24" :lg="6">
        <div class="box">123</div>
      </el-col>
            <el-col :xs="24" :lg="6">
        <div class="box">123</div>
      </el-col>
            <el-col :xs="24" :lg="6">
        <div class="box">123</div>
      </el-col> -->
    </el-row>
  </div>
</template>
<script>
import Logo from "@/components/User/Logo.vue";
export default {
  data() {
    return {
      data: [],
      input: "",
      type: [],
      tabPosition: ""
    };
  },
  components: { Logo },

  methods: {
    product_show() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/admin/index/product_show")
        .then(res => {
          // console.log(res);
          this.data = res.data.data;
          console.log(this.data);
        });
    },
    search() {
      this.axios
        .get(
          "/personCustom_api/PersonTp5/public/admin/index/product_show?id=" +
            this.input
        )
        .then(res => {
          // console.log(res);
          this.data = res.data.data;
          console.log(this.data);
        });
    },
    sumbit() {
      this.$router.push("/Qualifications");
    },
    ToDetail(){
        console.log('asdsd');
         this.$router.push("/Video_detail");     
    }
  },
  mounted() {
    this.product_show();
  }
};
</script>
<style scoped lang="less">

.el-row {
  margin: 0 auto;
  display: flex;
  justify-content: center;
//   border: 1px red solid;
  flex-wrap:wrap;
  .el-col {
    display: flex;
    // border: 1px red solid;
    .box {
      border: 1px red solid;
    padding-bottom: 20px;
    padding-right: 20px;
      display: flex;
         flex-wrap: wrap;
      align-items: flex-start;
      width: 100%;
      img{
        //   width: 50%;
        padding-right: 5px;
          height: 100px;
      }
    }
    .col_center1 {
      display: flex;
      width: 100%;
      justify-content: center;
      height: 100%;
    }
  }
  
}
.row-content{
      justify-content: flex-start;
}
</style>