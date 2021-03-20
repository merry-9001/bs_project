<template>
  <div>
    <Logo>
      <span slot="name">资源中心</span>
    </Logo>
    <el-row v-show="show">
       <transition name="el-zoom-in-top">
      <div>
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
      </div>
       </transition>
    </el-row>

    <el-row>
       <transition name="el-zoom-in-center">
         <!-- <el-collapse-transition> -->
         <div v-show="show">
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
          </div>
          <!-- </el-collapse-transition> -->
      </transition>
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
      show:false,
    };
  },
  components: { Logo },

  methods: {
    product_show() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/resource_select")
        .then(res => {
          this.data = res.data.data;
          console.log(this.data);
          this.show=true;
        });
    },
    ToDetail(id) {
        var params = new URLSearchParams();
        params.append("username", this.$store.state.user.username);
        params.append("project_id",id);
        this.axios
          .post(
            "/personCustom_api/PersonTp5/public/index/bs/project_purchase_sumbit",
            params
          )
          .then(res => {
            console.log(res);
                    this.$router.push("/Person");      
          });
        // this.$alert("已成功将商品加入购物车中", "购物车", {
        //   confirmButtonText: "确定"
        // });
    },
    search() {
          var params = new URLSearchParams();
          params.append("input", this.input);
                    // console.log( this.input);
      this.axios
        .post(
          "/personCustom_api/PersonTp5/public/index/bs/res_search",params
        )
        .then(res => {
          console.log(res);
          this.data = res.data.data;
          // console.log(this.data);
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