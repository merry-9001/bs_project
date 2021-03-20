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
    <el-row class="row-mobile1">
      <el-col :xs="24" :lg="8">
        <div class="col_center1">
          <el-radio-group @change="search()" v-model="tabPosition" style="margin-bottom: 30px;margin-top:20px;">
            <el-radio-button label="计算机">计算机</el-radio-button>
            <el-radio-button label="高数">高数</el-radio-button>
            <el-radio-button label="英语">英语</el-radio-button>
            <el-radio-button label="娱乐">娱乐</el-radio-button>
            <el-radio-button label="全部" aria-checked>全部</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="row-content row-mobile">
      <div>
        <el-col  v-for="item in data" :key="item.video_id" :xs="12" :md="6">
          <div class="box"  @click="ToDetail(item.video_id,item.video_type_id)">
              <img class="video-img" :src="item.video_pic" alt="">
              <div class="width"><span>{{item.video_name}}</span></div>
              <div class="width">
              <!-- <span>{{item.video_name}}</span> -->
              <span>播放量：{{item.video_number}}</span>
              </div>
          </div>
        </el-col>
      </div>
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
      tabPosition: "1"
    };
  },
  components: { Logo },

  methods: {
    sort(){
     console.log(this.tabPosition);
    },
    product_show() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/video_select")
        .then(res => {
          // console.log(res);
          this.data = res.data.data;
          console.log(this.data);
        });
    },
    search() {

                var params = new URLSearchParams();
          params.append("sort", this.tabPosition);
          params.append("input", this.input);
          console.log(this.tabPosition);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/index/bs/video_search",params
        )
        .then(res => {
          console.log(res);
          this.data = res.data.data;
          // console.log(this.data);
        });
    },
    sumbit() {
      this.$router.push("/Qualifications");
    },
    ToDetail(id,sort){
 this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/video_number?id="+id)
        .then(res => {
          // console.log(res);
          // this.data = res.data.data;
          // console.log(this.data);
        });


         this.$router.push("/Video_detail/"+id+"/"+sort);     
    }
  },
  mounted() {
    this.product_show();
  }
};
</script>
<style scoped lang="less">

@media (max-width: 700px) {
.width{
width:100%;
padding: 0.25rem;
text-align: center;
}
      img{
          width: 90%;
        padding-right: 5px;
          height: 100px;
      }
}
@media (min-width: 1000px) {
.width{
width:100%;
padding: 0.25rem;
}
      img{
        //   width: 50%;
        padding-right: 5px;
          height: 100px;
      }
}

.row-mobile1{
      width:90%;
}
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
      // border: 1px red solid;
      border: 0.25rem;
      padding-bottom: 20px;
      padding-right: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      width: 100%;

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