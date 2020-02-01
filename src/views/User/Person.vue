<template>
  <div>
    <Logo>
      <span slot="name">个人中心</span>
    </Logo>
    <el-row>
      <el-col >
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="店铺" name="store">店铺</el-tab-pane>
            <el-tab-pane label="个人信息" name="person">个人信息</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">
              askfjsalkf 
            </el-tab-pane>
          </el-tabs>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import Logo from "@/components/User/Logo.vue";
export default {

    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },

  components: { Logo },

}
</script>
<style scoped lang="less">
.el-row{
  width:70%;
  margin:0 auto;
}
</style>