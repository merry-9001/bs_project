<template>
  <div>
    <Logo>
      <span slot="name">视频中心</span>
    </Logo>

    <el-row>
      <el-col :xs="24" :md="15">
        <div class="test_two_box">
          <h3>
            <span>{{Detail.video_name}}</span>
          </h3>
          <video id="myVideo" class="video-js">
            <source ref="videoPlay" :src="videoURL" type="video/mp4" />
            <!-- <source :src="Detail.video_url" type="video/mp4" /> -->
          </video>
        </div>
      </el-col>
      <el-col :xs="24" :md="9">
        <div class="recommand">
          <h4>
            <span>相关推荐</span>
            <div
              v-for="item in data"
              :key="item.video_id"
              class="box"
              @click="ToDetail(item.video_id,item.video_type_id)"
            >
              <img class="video-img" :src="item.video_pic" alt />
              <div class="width">
                <span>{{item.video_name}}</span>
              </div>
            </div>
          </h4>
        </div>
      </el-col>
      <el-col :xs="24" :md="15">
        <div class="comment">
          <el-input placeholder="请输入内容" v-model="inputs" clearable></el-input>
          <el-button type="primary" @click="detail_comment()">提交评论</el-button>
          <el-divider></el-divider>

          <el-card class="box-card">
            <h2 class="title">评论区</h2>
            <div v-for="item in apprise" :key="item.appraise_id" class="text_item">
              <span class="line">评论人：{{item.username }}</span>
              <div class="line_time">
                <span>{{item.time }}</span>
              </div>

              <span class="line">内容：{{ item.appraise_content }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Logo from "@/components/User/Logo.vue";
export default {
  data() {
    return {
      ids: "",
      id: this.$route.params.id,
      sort: this.$route.params.sort,
      data: [],
      input: "",
      inputs: "",
      type: [],
      tabPosition: "",
      Detail: {},
      videoURL: "",
      apprise: []
    };
  },
  components: { Logo },

  methods: {
    detail_comment() {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.user.username);
      params.append("content", this.inputs);
      params.append("id", this.id);
      // console.log(this.inputs);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/index/bs/video_comment_add",
          params
        )
        .then(res => {
          this.select_comment();
          this.inputs = "";
                    this.$notify({
          title: '回答',
          message: '评论成功，积分+5',
          duration: 0
        });
        });
    },
    playVideo() {
      setTimeout(() => {
        this.videoURL = this.Detail.video_url;
        this.$refs.videoPlay.src = this.videoURL;
        let myPlayer = this.$video(myVideo, {
          // src:this.Detail.video_url,
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",

          //设置视频播放器的显示高度（以像素为单位）
          height: "500px"
        });
      }, 800);
    },
    search() {
      var params = new URLSearchParams();
      params.append("sort", this.sort);
      params.append("input", this.input);
      // console.log(this.tabPosition);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/index/bs/video_search2",
          params
        )
        .then(res => {
          console.log(res);
          this.data = res.data.data;
          console.log(this.data);
        });
    },

    ToDetail(id, sort) {
      console.log(id);
      console.log(sort);
      this.axios
        .get(
          "/personCustom_api/PersonTp5/public/index/bs/video_number?id=" + id
        )
        .then(res => {
          // console.log(res);
          // this.data = res.data.data;
          // console.log(this.data);
        });

      // this.ids=id;
      this.$router.push("/Video_detail/" + id + "/" + sort);
    },
    select_comment() {
      this.axios
        .get(
          "/personCustom_api/PersonTp5/public/index/bs/select_comment?id=" +
            this.id
        )
        .then(res => {
          // console.log(res);
          this.apprise = res.data.data;
          console.log(this.apprise);
        });
    }
  },
  watch: {
    // 方法1
    $route(to, from) {
      //监听路由是否变化
      this.$router.go(0);
    }
  },
  mounted() {
    console.log(this.sort);
    this.search();
    this.axios
      .get(
        "/personCustom_api/PersonTp5/public/index/bs/video_detail?id=" + this.id
      )
      .then(res => {
        this.Detail = res.data.data;
        console.log(this.Detail.video_url);
        //  this.apprise = res.data.apprise.apprise;
        // console.log(this.apprise);
      });
    this.playVideo();
    this.select_comment();
  }
};
</script>
<style scoped lang="less">

@media (max-width: 700px) {
    body {
    // font-size: 14px;
    // background-color: #bfa;
  }
  .el-row {
    width: 95%;
  }
  img {
    width: 90%;
    padding-right: 5px;
    height: 200px;
  }
}
@media (min-width: 1000px) {
  .el-row {
    width: 75%;
  }
  img {
    width: 80%;
    padding-right: 5px;
    height: 100px;
  }
  .recommand {
    padding-left: 3rem;
  }
}
.box-card{
  .title{

  }
  .text_item{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 0.4rem;
    .line{
    // border: 1px red solid;
    width:50%;
    
    }
    .line_time{
      width:50%;
      // border: 1px red solid;
      display: flex;
      justify-content: flex-end;
      padding-bottom: 0.2rem;
    }
  }
}
.comment {
  // padding-top:2rem;
  .el-input {
    width: 80%;
  }
}
.box {
  // border: 1px red solid;
  // border: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
  align-items: flex-start;
  // width: 100%;
}
.video-js {
  width: 100%;
  // border: 1px red solid;
}
.el-row {
  // width: 75%;
  margin: 0 auto;
  // border: 1px red solid;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 1rem;
  padding-right: 1rem;
}
.col_center1 {
  display: flex;
  width: 100%;
  //   border: 1px red solid;
  justify-content: center;

  height: 100%;
}
//   .buttons{
//     padding-top: 5px;
//   }
.price {
  display: block;
  padding-bottom: 10px;
}
.image {
  width: 210px;
  height: 210px;
}
</style>