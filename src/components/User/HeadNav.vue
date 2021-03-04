<template>
  <el-header>
    <el-row type="flex">
      <el-col :md="10" class="hidden-xs-only">
        <div class="grid-content headwidth">
          <router-link class="headspan" to="/index">
            <i class="iconfont icon-icon_huabanfuben"></i>
          </router-link>
           <router-link class="headspan" to="/Resources">资源（链接）&nbsp;</router-link>
          <router-link class="headspan" to="/Product">提问回答&nbsp;</router-link>
          <!-- <router-link class="headspan" to="/Qualifications">申请资质</router-link> -->
          <router-link class="headspan" to="/Market">交易市场</router-link>
          <router-link class="headspan" to="/Video">视频</router-link>
          <router-link class="headspan" to="/Express">快递信息服务</router-link>
        </div>
      </el-col>
      <el-col :md="14" class="hidden-xs-only">
        <div class="grid-content headwidth1" v-if="$store.state.user.nickname==''">
          <router-link to="/login" class="headspan">请登录&nbsp;</router-link>
          <router-link to="/register" class="headspan">免费注册</router-link>
        </div>
        <div v-else class="headwidth1">
          <!-- <el-badge v-if="f==0" class="item">
            <el-button size="mini" icon="el-icon-edit" circle @click="open()"></el-button>
          </el-badge>
          <el-badge v-else :value="f" class="item">
            <el-button size="mini" icon="el-icon-edit" circle @click="open()"></el-button>
          </el-badge>&nbsp;&nbsp; -->
          <img :src="$store.state.user.headphoto" class="avatar" />
          <!-- <span class="nickname headspan">{{$store.state.user.nickname}} &nbsp;&nbsp;&nbsp;</span> -->
          <!-- <router-link to="/cart" class="headspan">购物车</router-link>
          <router-link to="/order" class="headspan">&nbsp;&nbsp;订单</router-link>
          <router-link to="/order" class="headspan">&nbsp;&nbsp;我的中心</router-link> -->
    <el-dropdown  class="down" trigger="click">
      <span class="el-dropdown-link">
        <!-- {{$store.state.user.headphoto}} -->
        {{$store.state.user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu   slot="dropdown">
        <el-dropdown-item icon="el-icon-shopping-cart-full" @click.native="handleEdit(1)">购物车</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" @click.native="handleEdit(2)">订单</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="handleEdit(3)">个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="handleEdit(4)">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

        </div>
      </el-col>
  <div class="mobie_menus">
        <el-col :xs="24" class="hidden-sm-and-up">
          <div class="mobie_menu">
            <i class="iconfont icon-caidan" @click="chanView(1)"></i>
            <router-link class="headspan" to="/index">
              <i class="iconfont icon-icon_huabanfuben"></i>
            </router-link>
            <i class="iconfont icon-gerenyonghutouxiang" @click="chanView(2)"></i>
          </div>
        </el-col>
    </div>
    
          <el-col :xs="24" :class="menuview">
            
            <ul v-if="buttion_flag==1">
    <router-link tag="li" class="headspan" to="/Resources">资源（电影链接）&nbsp;</router-link>
    <router-link tag="li" class="headspan" to="/Product">提问回答&nbsp;</router-link>
    <router-link tag="li" class="headspan" to="/Market">交易市场&nbsp;</router-link>
    <router-link tag="li" class="headspan" to="/Video">视频&nbsp;</router-link>
            </ul>
            <!-- <ul v-else>
              <li>sa</li>
              <li>ss</li>
              <li>wssads</li>
            </ul> -->
          </el-col>

    </el-row>
  </el-header>
</template>

<script>
export default {
  name: "headnva",
  data() {
    return {
      f: 0,
      dialogVisible: false,
      question: [],
      flag: 0,
      menuview: "hidden-lg-and-down",
      buttion_flag:0,
       activeIndex: '1',
    };
  },
  components: {},
  mounted() {
    this.refresh();
  },
  methods: {
    click() {
      localStorage.removeItem("nickname");
      localStorage.removeItem("headphoto");
      localStorage.removeItem("username");
      this.$store.commit("user/NAME", {
        nickname: "",
        headphoto: "",
        username: ""
      });
    },
    open() {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.user.username);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/admin/index/open_slove",
          params
        )
        .then(res => {
          console.log(res);
          this.question = res.data.data;
          this.flag = res.data.apply.flag;
          // console.log(this.question);
        });
      this.dialogVisible = true;
      this.refresh();
      // console.log('asd');
    },
    refresh() {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.user.username);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/admin/index/open_index",
          params
        )
        .then(res => {
          this.f = res.data.data;
        });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    chanView(flag) {
      this.buttion_flag=flag;
      console.log(this.buttion_flag);
      if (this.menuview != "") {
        // this.iconview[0] = "el-icon-s-fold";

        this.menuview = "";
      } else {
        // this.iconview[0] = "el-icon-s-unfold";
        this.menuview = "hidden-lg-and-down";
      }
    },
    handleEdit(e){
      if(e==1)
        this.$router.push("/cart");
        else if(e==2)
         this.$router.push("/order");
         else if(e==3)
         this.$router.push("/person");
         else
         {         this.$router.push("/login");
                 localStorage.removeItem("nickname");
      localStorage.removeItem("headphoto");
      localStorage.removeItem("username");
      this.$store.commit("user/NAME", {
        nickname: "",
        headphoto: "",
        username: ""
      });
         }

    }
  }
};
</script>
<style scoped lang="less">
 .router-link-active{
  //  background: #409EFF;
  // background:lightblue;
    // color: #43b5f7;
  text-decoration: underline;
 }
.down{
  margin-right:200px;
  // width:100px;
}
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
ul,li{ padding:0;margin:0;list-style:none}
.mobie_menus{
  width: 100%;
  // border: 1px black solid;
  background-color: #f5f5f5;
  .mobie_menu {
  display: flex;
  justify-content: space-between;
  align-items: top;
  // border: 1px black solid;
    width: 100%;
  .iconfont {
    font-size: 1.7rem;
  }
  .mobile {
    display: flex;
    justify-content: space-between;
    .icon-icon_huabanfuben {
      font-size: 1.5rem;
    }
  }
}
}


.el-menu-demo {
  width: 100%;
}
// .headspan.router-link-active {

// }
.el-header {
  background-color: #f5f5f5;
  padding-left: 0px;
  padding-right: 0px;
  width: 100%;
  height: 100% !important;
  .el-row {
          display: flex;
      flex-wrap: wrap;
    .el-col {
      // border: 1px black solid;
      display: flex;
      flex-wrap: wrap;
      height: 100% !important;
    }
    .headwidth1 {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .avatar {
        width: 2rem;
        border-radius: 50%;
      }
      .headspan {
        text-decoration: none;
        color: black;
        padding-left: 0.3rem;
        // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      }
      .headspan:last-child{
        padding-right:4rem;
      }
      .nickname {
        color: red !important;
      }
    }
    .headwidth {
      width: 100%;
      // border: 1px black solid;
      display: flex;
      justify-content: center;
      align-items: center;
      .headspan {
        text-decoration: none;
        color: black;
        padding-left: 0.6rem;
      }
      .icon-icon_huabanfuben {
        font-size: 1.5rem;
      }
    }
    .red {
      color: red;
      font-size: 18px;
    }
  }
}
</style>