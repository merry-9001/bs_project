<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="headwidth">
          <img src="../../assets/register/register_pic.jpg" alt />
          <div class="headspan">
            <slot name="name">
              <span>用户注册</span>
            </slot>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  // name: 'logo',
};
</script>
<style scoped lang="less">

.headwidth {
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  // border: 1px black solid;
  img {
    width: 150px;
    height: 70px;
    //   border: 1px black solid;
  }
}
</style>
