<template>
  <div>
    <Logo>
      <span slot="name">问题填写</span>
    </Logo>
    <div class="table">
      <el-form ref="form" :model="form" label-width="100px">

        <el-form-item  label="所需积分">
          <el-input disabled v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="问题及简介" >
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提问</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/User/Logo.vue";
export default {
  data() {
    return {
      form: {
        desc: "",
        price:100
      },
      type:[],
    };
  },
  components: { Logo },

  methods:{
      onSubmit(){
        // console.log(this.form.type);
        // console.log(this.form.desc);
        // console.log(this.form.key);
        // console.log(this.form.price);
        var params=new URLSearchParams();
        params.append("username",this.$store.state.user.username);
        params.append("question_content", this.form.desc);
        params.append("question_price", this.form.price);
        // params.append("sum", this.sum);
    this.axios.post("/personCustom_api/PersonTp5/public/admin/bs/question_user_sumbit",params)
    .then(res=>{
      console.log(res);
      // this.type=res.data.data;
      // console.log(this.type);
    })
        this.$notify({
          title: '提问',
          message: '您的提问已上交，请耐心等候回复',
          duration: 0
        });

       this.$router.push('/index');
      }
  }
};
</script>
<style scoped lang="less">
// .table{
//   width:50%;
//   margin: 0 auto;
// }
</style>
