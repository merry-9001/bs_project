<template>
  <div class="contaniner">
    <el-row>
      <el-col>
        <div class="contaniner1">
          <span class="question">提出你的问题</span>
          <el-carousel :interval="4000" class="carousel">
            <el-carousel-item>
              <img class="width" src="../../assets/product/q2.jpg" alt />
            </el-carousel-item>
            <el-carousel-item>
              <img class="width" src="../../assets/product/q3.jpg" alt />
            </el-carousel-item>
            <el-carousel-item>
              <img class="width" src="../../assets/product/q4.jpg" alt />
            </el-carousel-item>
          </el-carousel>
          <span
            class="block"
          >世间百问，我最知道；知识江湖，谁主沉浮？ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 在这里，你可以和共同爱好、专长和理想的知友组建团队~</span>
          <span
            class="block"
          >通过专业知识帮助数亿网友！ &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 回答内容客观真实， 有来源可查证</span>
          <span class="block"></span>
          <span class="block">回答全面有详略，详细介绍重点内容</span>
          <span class="block">
            回答内容通俗易懂 &nbsp;&nbsp;&nbsp;
            <el-button type="success" @click="question()">提问</el-button>
          </span>
        </div>
      </el-col>
    </el-row>
      <el-row>
      <el-col>
       <el-collapse >
  <el-collapse-item v-for="item in questions" :key="item.question_id" :title="item.question_content" :name="item.question_id">
    <div>{{item.solve_content1}}</div>
  </el-collapse-item>

</el-collapse>
      </el-col>
       </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      questions:[],
      input: "",
      activeNames: ['1']
    };
  },
  methods: {
    question() {
      this.$router.push("/question");
    },
    product_show() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/admin/index/product_show")
        .then(res => {
          // console.log(res);
          this.data = res.data.data;
          console.log(this.data);
        });

      this.axios
        .get("/personCustom_api/PersonTp5/public/admin/bs/question_select")
        .then(res => {

          this.questions = res.data.data;
          console.log(this.questions);
        });


    },
    ToDetail(id) {
      this.$router.push("/detail/1/" + id);
    },

    // ?id=" + cityId
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
    }
  },
  mounted() {
    this.product_show();
  }
};
</script>
<style scoped lang="less">
.contaniner {
  padding-top: 1.5rem;
  .el-row {
    width: 85%;
    margin: 0 auto;
    .contaniner1 {

      .carousel{
        height: 100%;
   
        margin: 0 auto;
        // border: 1px red solid;
      }
      .width {
      width: 100%;
      height: 100%;
      }
      .question {
        display: block;
        font-size: 1.5rem;
        font-weight: bolder;
        color: #ba55d3;
        padding-bottom: 1rem;
      }
      .block {
        display: block;
        padding: 10px;
        font-size: 1rem;
      }
    }
  }
}

</style>