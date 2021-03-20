<template>
  <div class="container">
    <div id="myChart" class="style" :style="{width: '800px', height: '600px'}"></div>
    <div id="myChart2" class="style" :style="{width: '800px', height: '600px'}"></div>
  </div>
</template>
 
<script>
export default {
  name: "hello",
  data() {
    return {
      chartsData: [],
      tableDetail1: [],
      tableDetail2: [],
      tableDetail3: [],
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
        .get("/personCustom_api/PersonTp5/public/index/bs/video_count")
        .then(res => {
          // console.log(res);
          this.tableDetail1 = res.data.res;
          // this.tableDetail2 = res.data.res1;
          console.log(this.tableDetail1);
          // console.log(this.tableDetail2);
          var a = [];
          var b = [];
          this.tableDetail1.forEach((e, index) => {
            // console.log(e.value);
            b.push(e.name);
            a.push(e.value);
          });
          console.log(a, b);

          //   this.chartsData=['sd','sad'];
          //   console.log(this.inital);
          myChart.setOption({
            title: {
              text: "单个视频播放量",
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc"
              }
            },
            color: ["#3398DB"],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: b,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "直接访问",
                type: "bar",
                barWidth: "60%",
                data: a
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
        .get("/personCustom_api/PersonTp5/public/index/bs/video_type_count")
        .then(res => {
          // console.log(res);
          this.tableDetail3 = res.data.res;
          var a = [];
          var b = [];

          this.tableDetail3.forEach((e, index) => {
            // console.log(e.value);
            b.push(e.name);
            a.push(e.value);
          });
          console.log(a, b);

          //   console.log(this.tableDetail);

          //   this.chartsData=['sd','sad'];
          //   console.log(this.inital);
          myChart.setOption({
          title: {
        text: '视频板块播放量',
        // subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: b
    },
    series: [
,
        {
            // name: '2012年',
            type: 'bar',
            data: a
        }
    ]



          });
        });
    }
  }
};
</script>
 
<style scoped lang="less">
.style {
  margin: 0 auto;
  // border: 1px red solid;
  padding-top: 20px;
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
