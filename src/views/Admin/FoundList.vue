<template>
  <div class="container">
    <div id="myChart" class="style"  :style="{width: '800px', height: '600px'}"></div>
    <div id="myChart2"  class="style" :style="{width: '800px', height: '600px'}"></div>
  </div>
</template>
 
<script>
export default {
  name: "hello",
  data() {
    return {
      chartsData: [],
      tableDetail: [],
      tableDetail2: [],
      inital: [],
      msg: "Welcome to Your Vue.js App"
    };
  },

  mounted() {
    this.drawLine();
    this.drawLine2();
  },
  methods: {


    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/user_project_count")
        .then(res => {
          // console.log(res);
          this.tableDetail = res.data.res;

          //   console.log(this.tableDetail);

          //   this.chartsData=['sd','sad'];
          //   console.log(this.inital);
          myChart.setOption({
            title: {
              text: "三方交易用户购买top",
              // subtext: '纯属虚构',
              left: "center"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: "vertical",
              left: "left",
              data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: "75%",
                center: ["50%", "60%"],
                data: this.tableDetail,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }
              }
            ]
          });
        });
    },

 drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/order_echarts")
        .then(res => {
          // console.log(res);
          this.tableDetail2 = res.data.res;

            console.log(this.tableDetail2);
          var a = [];
          var b = [];

          this.tableDetail2.forEach((e, index) => {
            // console.log(e.value);
            b.push(e.name);
            a.push(e.value);
          });
          console.log(a, b);
          //   this.chartsData=['sd','sad'];
          //   console.log(this.inital);
          myChart.setOption({
         

//  backgroundColor: '#2c343c',

    title: {
        text: '用户销售金额top',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    xAxis: {
        type: 'category',
        data: b
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data:a,
        type: 'line'
    }]


          });
        });
    }

  }
};
</script>
 
<style scoped lang="less">
    .style{
        margin: 0 auto;
        // border: 1px red solid;
        padding-top:20px;
    }
.container {

  margin: 0 auto;
  width: 80%;
//   height: 100%;
  padding: 30px;
  box-sizing: border-box;
//   border: 1px red solid;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style> 
