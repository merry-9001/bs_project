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
       <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
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
    },
    ToDetail(id) {
      this.$router.push("/detail/1/" + id);
    },
          handleChange(val) {
        console.log(val);
      }
    ,
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