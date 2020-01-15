<template>
  <div class="contaniner">
    <Logo>
      <span slot="name">订制新资源</span>
    </Logo>
    <div class="contaniner_table-qualification">
      <el-form ref="form" :model="sizeForm" label-width="80px" :rules="rules">
        <el-form-item label="资源名" class="input_width" prop="name">
          <el-input v-model="sizeForm.name" width="200"></el-input>
        </el-form-item>

        <el-form-item label="简单介绍" class="input_width">
          <el-input type="textarea" placeholder="请输入内容" v-model="sizeForm.person"></el-input>
        </el-form-item>


          <el-form-item label="图片:">
            <input class="src_img" type="file" name="file" value="上传图片" @change="handleToUpload" />
            <img :src="sizeForm.src" class="head" />
          </el-form-item>

        <el-form-item label prop="info">
          <el-switch v-model="sizeForm.delivery"></el-switch>确认此资源未在资源库
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/User/Logo.vue";
export default {
  components: { Logo },
  data() {
    var info = (rule, value, callback) => {
      if (this.sizeForm.delivery ==false) {
        callback(new Error('请勾选'));
      } 
      else
      {
        callback();
      }
    };

    return {
      sizeForm: {
        name: "",
        person: "",
        src:""
      },
      type: [],
      rules: {
        name: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        ok: [
          {
            required: true,
            message: "请勾选",
            trigger: "blur"
          }
        ],

          info: [
          {
            validator: info,
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
        var params = new URLSearchParams();
        params.append("name", this.sizeForm.name);
        params.append("introduce", this.sizeForm.person);
        params.append("username", this.$store.state.user.username);
        params.append("src", this.sizeForm.src);
          console.log(this.sizeForm);
        this.axios
          .post(
            "/personCustom_api/PersonTp5/public/admin/bs/resource_sumbit",
            params
          )
          .then(res => {
            console.log(res);

              this.$notify({
                title: "申请",
                message: "您的申请已发送，请耐心等待回复",
                duration: 0,
                type: "success"
              });
              this.$router.push("/Resources");

          });
        }
        else
        {
          this.$message.error("请填写完整信息");
        }
      })
    },
    handleToUpload(ev) {
      var file = ev.target.files[0];
      var param = new FormData();
      param.append("file", file, file.name);
      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.axios.post("/management_api/picUpload.php", param, config).then(res => {
        console.log(res);
         var stauts = res.data.stauts;
        // console.log(msg);
        // var that = this;
         if (stauts === "ok") {
           this.sizeForm.src='http://47.96.175.28/management_api/upload/'+res.data.address;
          //  this.msg=res.data.address;
          //  this.$emit('func',this.msg)
            // console.log(this.msg);
         }
      });
    },
  },
  mounted() {
    this.axios
      .get("/personCustom_api/PersonTp5/public/admin/index/apply_type")
      .then(res => {
        // console.log(res);
        this.type = res.data.data;
        console.log(this.type);
      });
  }
};
</script>
<style scoped lang="less">
// .input_width {
//   width: 350px;
// }
.src_img{
  width:100%;
}
.contaniner {
  width: 100%;
}
.head {
  width: 150px;
  height: 150px;
}
</style>