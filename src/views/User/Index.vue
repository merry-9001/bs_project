<template>
  <div class="contaniner-whole">
    <div class="div_img">
      <img src="http://localhost:8000/personCustom_api/images/user/index/l1.jpg" class="img-size" />
    </div>
    <div>

      
      <el-row>
        <el-col>
          <div class="col_center1">服务介绍</div>
          <span class="word">
            主要为了服务在校的大学生。
            大学生在校园生活中，经常会遇到很多生活上的问题，大家可以在网站上一起交流，可以买卖一些自己的闲置商品，也可以在视频中心学习和娱乐，在网站一切都由用户主导，主动请求资源，提出问题，买卖商品，快递查询等。
          </span>
          <el-divider></el-divider>
        </el-col>
      </el-row>

      <el-row v-for="item in  personData" :key="item.project_type_id" class="v_for_row">
        <div>
          <router-link
            tag="span"
            class="title"
            :to="item.project_type_href"
          >{{item.project_type_name}}</router-link>
        </div>
        <el-col :xs="24" :md="10">
          <div class="contaniner">
            <router-link :to="item.project_type_href">
              <img :src="item.project_type_img" class="img-size" />
            </router-link>
          </div>
        </el-col>
        <el-col :xs="24" :md="14">
          <div class="contaniner2">
            <span class="content_span">{{item.project_type_content}}</span>
          </div>
        </el-col>
      </el-row>
      <!-- asjdklasjdl -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personData: {}
    };
  },
  mounted() {
    // this.axios
    //   .get("/personCustom_api/PersonTp5/public/index/bs/yu")
    //   .then(res => {
    //     console.log(res);
    //     this.personData = res.data.data;
    //     console.log(this.personData);
    //   });


    this.axios
      .get("/personCustom_api/PersonTp5/public/index/bs/project_type")
      .then(res => {
        console.log(res);
        this.personData = res.data.data;
        console.log(this.personData);
      });
  },
  methods: {
    ToDetail(id) {
      // console.log(id);
      this.$router.push("/detail/1/" + id);
    }
  }
};
</script>
<style scoped lang="less">
.contaniner-whole {
  .div_img {
    .img-size {
      width: 100%;
    }
  }
  .el-row {
    // width: 75%;
    margin: 0 auto;
    .col_center1 {
      font-size: 20px;
      padding-bottom: 20px;
      padding-top: 20px;
      // border: 1px yellow solid;
    }
    .word {
      font-size: 1.1rem;
      // border: 1px yellow solid;
    }
    .contaniner {
      // border: 1px yellow solid;
      width: 100%;
      padding-top: 0.5rem;
      display: flex;
      justify-content: center;
      .img-size {
        height: 15rem;
        width: 100%;
      }
    }
  }
  .v_for_row {
    padding: 2rem 0rem;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
@media (max-width: 700px) {
  .el-row {
    width: 90%;
  }
  .contaniner2 {
    // padding-left: 3rem;

    .content_span {
      padding-left: 1rem;
      line-height: 2rem;
    }
  }
}
@media (min-width: 1000px) {
  .el-row {
    width: 75%;
  }
  .contaniner2 {
    padding-left: 3rem;
    .content_span {
      line-height: 2rem;
      padding-left: 1rem;
    }
  }
}
</style>
