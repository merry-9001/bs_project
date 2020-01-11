<template>
  <el-footer>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div class="footer">
            <div class="footer_top">
              <span>Mainland China ( 简体中文 / CNY )&nbsp;</span>
            </div>
            <hr />
            <div class="footer_bottom">
              <span>2020 usx.com 版权所有&nbsp;</span>
              <span>私人订制网</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-footer>
</template>

<script>
export default {
  name: "user_footer",
  components: {}
};
</script>
<style scoped lang="less">
.el-footer {
  background-color: #e7e7e7;
  height: 100px;
  color: #333;
  text-align: center;
  width: 100%;
  height: 6rem !important;
    // border: 1px black solid;
  .el-row {
    width: 100%;
        // border: 1px black solid;
        height:100%;
        display: flex;
        align-items: center;
    .el-col {
      .grid-content {
        .footer {
          span{
            font-size: 1rem;
          }
          .footer_top {
            width: 100%;
            // height: 40px; /*设置div的大小*/
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }
          .footer_bottom {
            width: 100%;
            // height: 40px; /*设置div的大小*/
          }
        }
      }
    }
  }
}
</style>