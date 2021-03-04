<template>
  <div>
    <Logo>
      <span slot="name">交易中心</span>
    </Logo>
    <el-row>
      <el-col :xs="12" :md="18">
        <div class="col_center1">
          <span>商品展示</span>
        </div>
      </el-col>

    </el-row>

    <el-row >
        <transition name="el-zoom-in-top">
          <div  v-show="show">
            <div v-for="item in data_name" :key="item.username" class="pro_flex">
            <div v-show="item.username!=$store.state.user.username" class="username">  <h1>{{item.username}}的店铺</h1></div>
            <div v-for="(items,index) in data_pro" :key="index" >

                <div v-show="item.username==items.username && item.username!=$store.state.user.username" class="content" >
          
              <el-card shadow>
                <img :src="items.project_src" class="image" />
                <div style="padding: 14px;">
                  <span class="price">{{items.project_name}}</span>
                  <div>
                    <span class="price">¥{{items.project_price}}</span>
                    <el-button type="primary" plain  @click="ToDetail(items.project_id)">详细</el-button>
                  </div>
                </div>
              </el-card>
                </div>
            </div>
            </div>
          </div>
       </transition>
    </el-row>
  </div>
</template>
<script>
import Logo from "@/components/User/Logo.vue";
export default {
  data() {
    return {
      data_name: [],
      data_pro: [],
      input: "",
      type: [],
      show:false,
    };
  },
  components: { Logo },

  methods: {
    product_show() {
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/product_show")
        .then(res => {
          // console.log(res);
          this.data_pro = res.data.data;
          this.data_name = res.data.data1;
          console.log(this.data_name );
          this.show=true;
        });
    },
    ToDetail(id) {
      this.$router.push("/detail/" + id);
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
  },
  mounted() {
    this.product_show();
  }
};
</script>
<style scoped lang="less">
.content{
  padding:0.2rem;
}
.username{
  width: 100%;
}
.yu{
  //  border: 1px red solid;
}
.pro_flex{
  // border: 1px red solid;
    // width:80%;
  // margin:0 auto;
  display: flex;
  flex-wrap: wrap;
}
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