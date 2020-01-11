<template>
  <div>
    <Logo>
      <span slot="name">视频中心</span>
    </Logo>

    <el-row>
      <el-col>
        <div class="test_two_box">
          <video id="myVideo" class="video-js">
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          </video>
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
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",

        //设置视频播放器的显示高度（以像素为单位）
        height: "400px"
      });
    }
  },
  mounted() {
    this.product_show();
    this.initVideo();
  }
};
</script>
<style scoped lang="less">
.video-js
{
    width:100%;
        border: 1px red solid;
}
.el-row {
  width: 80%;
  margin: 0 auto;
  //   border: 1px red solid;
  display: flex;
  justify-content: center;
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