<template>
  <div class="home">
    <!-- <el-container> -->
     <UserHead></UserHead>

<!-- <transition name="el-zoom-in-center"> -->
  <!-- <div  v-show="show"> </div> -->
        <div class="rightContainer">
            <router-view></router-view>
        </div>
         <!-- </transition> -->
     <UserFooter></UserFooter>

    <!-- </el-container> -->
  </div>
</template>

<script>
import UserFooter from "@/components/User/UserFooter.vue";
import UserHead from "@/components/User/HeadNav.vue";
export default {
  name: "home",
 
  components: {
    UserFooter,
    UserHead
  }
};
</script>
<style scoped lang="less">
.home{
  display: flex;
  min-height: 100vh;
  flex-flow: column;
}
.rightContainer
{
  flex:1;

}


</style>
