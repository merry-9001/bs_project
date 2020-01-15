<template>
  <div>
    <Logo>
      <span slot="name">资源中心</span>
    </Logo>
    <el-row>
      <el-col :xs="12" :lg="12">
        <div class="col_center1">
          <span>资源展示</span>
        </div>
      </el-col>
      <el-col :xs="12" :lg="6">
        <div class="col_center1 buttons">
           <el-button type="success" size="small" @click="sumbit()">请求新资源</el-button>
        </div>
      </el-col>
      <el-col  :xs="24"  :lg="6">
        <div class="col_center1">
          <el-input placeholder="搜索" v-model="input" clearable maxlength="10" width="100"></el-input>
          <el-button @click="search()" icon="el-icon-search"></el-button>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :xs="24" :lg="6" v-for="item in data" :key="item.project_id">
        <el-card shadow>
          <img :src="item.project_src" class="image" />
          <div style="padding: 14px;">
            <span class="price">{{item.project_name}}</span>
            <div>
              <span class="price">¥{{item.project_price}}</span>
              <span class="price">共有{{item.project_num}}人付款</span>
              <el-button type="primary" plain  @click="ToDetail(item.project_id)">购买</el-button>
            </div>
          </div>
        </el-card>
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
      type: []
    };
  },
  components: { Logo },

  methods: {
    product_show() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/admin/bs/resource_select")
        .then(res => {
          // console.log(res);
          this.data = res.data.data;
          console.log(this.data);
        });
    },
    ToDetail(id) {
      this.$router.push("/detail/1/" + id);
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
    sumbit(){
        this.$router.push("/Qualifications");      
    }
  },
  mounted() {
    this.product_show();
  }
};
</script>
<style scoped lang="less">
.el-row{
  width:80%;
  margin:0 auto;
}
.col_center1 {
  display: flex;
//   border: 1px red solid;
  padding-top: 15px;
  height:100%;

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