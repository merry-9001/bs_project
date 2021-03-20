<template>
  <div class="contaniner">
  <transition name="el-zoom-in-center">
    <div v-show="show">
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
        <span class="question1">问题汇总</span>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <div>
          <el-collapse>
            <el-collapse-item
              class="fontsize"
              v-for="items in questions"
              :key="items.quetion_id"
              :title="items.quetion_introduce"
              :name="items.quetion_id"
            >
              <div>
                <h2 class="title">官方回答：{{items.quetion_reply}}</h2>
                <el-divider content-position="left">评论区</el-divider>
                <el-card class="box-card">
                  <!-- 评论区 -->
                  <div v-for="item in apprise" :key="item.quetion_apprise_id">
                    <!-- {{items.quetion_id}} {{item.quetion_apprise_id}} -->
                    <div v-if="item.quetion_id==items.quetion_id" class="text_item">
                      <span class="line">评论人：{{item.username }}</span>
                      <div class="line_time">
                        <span>{{item.time }}</span>
                      </div>

                      <span class="line">内容：{{ item.appraise_content }}</span>
                    </div>
                  </div>
                </el-card>
                <el-divider content-position="left">发表评论</el-divider>
                <el-input placeholder="请输入内容" v-model="inputs" clearable></el-input>
                <el-button
                  type="primary"
                  @click="detail_comment(items.quetion_id)"
                  icon="el-icon-edit"
                  circle
                ></el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // data: [],
      questions: [],
      input: "",
      // activeNames: ["1"],
      apprise: [],
      inputs: "",
      show:false,
    };
  },
  methods: {
    question() {
      this.$router.push("/question");
    },

    detail_comment(id) {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.user.username);
      params.append("content", this.inputs);
      params.append("id", id);
      // console.log(this.inputs);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/index/bs/question_comment_add",
          params
        )
        .then(res => {
          console.log(res);
          this.select_comment();
          this.inputs = "";

          this.$notify({
            title: "回答",
            message: "评论成功，积分+5",
            duration: 0
          });
        });
    },

    product_show() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/question_select")
        .then(res => {
          console.log(res.data.data);
          this.questions = res.data.data;
          console.log(this.questions);
          this.show=true;
        });
    },

    select_comment() {
      this.axios
        .get(
          "/personCustom_api/PersonTp5/public/index/bs/question_select_comment"
        )
        .then(res => {
          // console.log(res);
          this.apprise = res.data.data;
          console.log(this.apprise);
        });
    },
    // ToDetail(id) {
    //   this.$router.push("/detail/1/" + id);
    // },

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
    this.select_comment();
  }
};
</script>
<style scoped lang="less">
.el-collapse-item__header {
  font-size: 20px;
}
@media (max-width: 700px) {
  .el-row {
    width: 90%;
    margin: 0 auto;
  }
}
@media (min-width: 1000px) {
  .el-row {
    width: 60%;
    margin: 0 auto;
  }
}
.question1 {
  display: block;
  font-size: 1.5rem;
  font-weight: bolder;
  color: #ba55d3;
  padding-top: 3rem;
  padding-bottom: 1rem;
}
.contaniner {
  padding-top: 1.5rem;
  .el-row {
    .contaniner1 {
      .carousel {
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
.box-card {
  .title {
  }
  .text_item {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0.4rem;
    .line {
      // border: 1px red solid;
      width: 50%;
    }
    .line_time {
      width: 50%;
      // border: 1px red solid;
      display: flex;
      justify-content: flex-end;
      padding-bottom: 0.2rem;
    }
  }
}
</style>