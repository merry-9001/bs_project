<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <router-link to="/admin/index">
          <el-menu-item index="0">
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <div v-if="$store.state.user.name=='admin'">
        <template v-for="item in items1" >
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                <template slot="title">
                    <i :class="'el-icon-' +item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </template>
                <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                    <el-menu-item :index="citem.path"> 
                        <span slot="title">{{citem.name}}</span>
                    </el-menu-item>
                </router-link>
            </el-submenu>
        </template>
        </div>
        <div v-else>

        <template v-for="item in items" >
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                <template slot="title">
                    <i :class="'el-icon-' +item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                </template>
                <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                    <el-menu-item :index="citem.path"> 
                        <span slot="title">{{citem.name}}</span>
                    </el-menu-item>
                </router-link>
            </el-submenu>
        </template>

        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "left",
  data() {
    return {
      items: [
        {
          icon: "ice-cream-square",
          name: "图表统计",
          path: "fund",
          children: [
            {
              path: "fundlist",
              name: "用户销售统计"
            },
            {
              path: "fundlist2",
              name: "视频播放量统计"
            }
          ]
        },
        {
          icon: "user-solid",
          name: "信息管理",
          path: "info",
          children: [
            {
              path: "infoshow",
              name: "个人信息"
            }
          ]
        },
        {
          icon: "user-solid",
          name: "私人订制项目",
          path: "fund1",
          children: [
            {
              path: "/admin/PersonCustom",
              name: "项目管理"
            }
          ]
        },
        {
          icon: "s-platform",
          name: "提问回答",
          path: "info1",
          children: [
            {
              path: "question",
              name: "提问中心"
            }
          ]
        },
        {
          icon: "s-platform",
          name: "视频管理",
          path: "info11",
          children: [
            {
              path: "PersonVideo",
              name: "视频审核"
            }
          ]
        },
      ],
      items1: [
        {
          icon: "ice-cream-square",
          name: "图表统计",
          path: "fund",
          children: [

            {
              path: "fundlist3",
              name: "资源链接与提问统计"
            }
          ]
        },
        {
          icon: "user-solid",
          name: "信息管理",
          path: "info",
          children: [
            {
              path: "infoshow",
              name: "个人信息"
            },
            // {
            //   path: "",
            //   name: "用户管理"
            // }
          ]
        },
        {
          icon: "user-solid",
          name: "数据库管理",
          path: "fund1",
          children: [
            {
              path: "/admin/PersonDatabse",
              name: "数据库备份"
            }
          ]
        },
        {
          icon: "s-platform",
          name: "用户管理",
          path: "info1",
          children: [
            {
              path: "/admin/PersonUserState",
              name: "用户信息"
            },
            {
              path: "/admin/PersonLogo",
              name: "日志信息"
            }
          ]
        },
      ],      
    };
  }
};
</script>
<style scoped>
 .menu_page {
        position: fixed;
        top: 71px;
        left: 0;
        min-height: 100%;
        background-color: #324057;
        z-index: 99;
    }

    .el-menu {
        border: none;
    }

    .fa-margin {
        margin-right: 5px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 180px;
        min-height: 400px;
    }

    .el-menu-vertical-demo {
        width: 35px;
    }

    .el-submenu .el-menu-item {
        min-width: 180px;
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }

    a {
        text-decoration: none;
    }
</style>