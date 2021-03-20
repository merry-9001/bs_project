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
      tableDetail: [],
      tableDetail2: [],
      inital: [],
      msg: "Welcome to Your Vue.js App"
    };
  },

  mounted() {
    this.drawLine();
    // this.drawLine2();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.axios
        .get("/personCustom_api/PersonTp5/public/index/bs/sum_charts")
        .then(res => {
          // console.log(res);
          this.tableDetail = res.data.res;
          console.log(res);
          var a=[res.data.res,res.data.res1,res.data.res2,res.data.res3,res.data.res4]
          
          var b=['资源链接总数','客户总数','视频总数','评论总数','提问总数']
          var c=[];
          for(var i=0;i<5;i++)
          {
            c=c+{'name':b[i],'value':a[i]};
          }
          // console.log(c);

          //   this.chartsData=['sd','sad'];
          //   console.log(this.inital);
          myChart.setOption({
           
          title: {
              text: "数据汇总",
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc"
              }
            },

    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: b
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: res.data.res, name: '资源链接总数'},
                {value: res.data.res1, name: '客户总数'},
                {value: res.data.res2, name: '视频总数'},
                {value: res.data.res2, name: '评论总数'},
                {value: res.data.res3, name: '提问总数'}
            ]
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

          //   console.log(this.tableDetail);

          //   this.chartsData=['sd','sad'];
          //   console.log(this.inital);
          myChart.setOption({
            backgroundColor: "#2c343c",

            title: {
              text: "用户销售金额top",
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc"
              }
            },

            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["50%", "50%"],
                data: this.tableDetail2.sort(function(a, b) {
                  return a.value - b.value;
                }),
                roseType: "radius",
                label: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                labelLine: {
                  lineStyle: {
                    color: "rgba(255, 255, 255, 0.3)"
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                },
                itemStyle: {
                  color: "#99ffcc",
                  shadowBlur: 200,
                  shadowColor: "rgba(255, 255, 255, 0.5)"
                },

                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: function(idx) {
                  return Math.random() * 200;
                }
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
