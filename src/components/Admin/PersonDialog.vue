<template>
  <div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal-append-to-body="false"
    >
      <el-form :model="formData" label-width="100px" ref="form"
     >
        <el-form-item label="名称">
          <el-input  disabled  v-model="formData.project_name" autocomplete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="资源链接">
          <el-input
            type="textarea"
            autosize
            v-model="content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      content:""
    };
  },
  props: {
    dialog: Object,
    formData: Object
  },
  methods: {
    handleToUpload(ev) {
      var file = ev.target.files[0];
      var param = new FormData();
      param.append("file", file, file.name);
      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      //   console.log('asddas');
      this.axios
        .post("/personCustom_api/picUpload.php", param, config)
        .then(res => {
          //   console.log(res);
          var stauts = res.data.stauts;

          if (stauts === "ok") {
            this.msg = res.data.address;
            this.$emit("func", this.msg);

            // console.log(this.msg);
          }
        });
    },
    onSubmit() {
      // const f = this.dialog.option;
      
      var params = new URLSearchParams();
      params.append("project_remake", this.content);
      params.append("project_id", this.formData.project_id);
      console.log(this.formData.project_id);
       console.log(this.content);
          this.axios.post("/personCustom_api/PersonTp5/public/index/bs/resource_edit", params).then(res => {
          console.log(res);
          this.content="";
          var stauts = res.data.msg;
          // console.log(msg);
          // var that = this;
          if (stauts === "ok") {
            this.dialog.show = false;
            this.$emit("update");
            this.$message({
              message: "上传成功",
              type: "success"
            });
          }
        });
      
    }
  }
};
</script>
<style scoped>
img {
  width: 200px;
  height: 150px;
}
</style>