<template>
  <div class="page">
    <div class="screen-bg">
      <el-select class="item" v-model="selectCoin" placeholder="币种">
        <el-option
          v-for="item in coins"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select class="item" v-model="selectPlatforms" placeholder="交易所" multiple>
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date-picker class="item"
        v-model="selectDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
			<el-button class="item" type="primary" @click="queryClick">查询</el-button>
    </div>
    <div class="echarts-bg">
      <div id="main" class="echarts"></div>
    </div>
  </div>
</template>
<script>
import util from '@/assets/js/util'
import * as echarts from "echarts";
import { time } from 'echarts';
export default {
  data() {
    return {
      myChart:'',
      selectCoin: '', //选择币种
      coins: [
        {
          value: "TRX",
          label: "TRX",
        }
      ],
      selectPlatforms: [], //选择平台
      platforms: [
        {
          value: "okex",
          label: "okex",
        },
        {
          value: "kucoin",
          label: "kucoin",
        }
      ],
      
      selectDate: [new Date(new Date().toLocaleDateString()).getTime(), new Date(new Date().toLocaleDateString()).getTime()], //选择日期
      
      chartsOption: {
        tooltip: {
          trigger: "axis",
        },
        legend:{
          data:[]
        },
        dataZoom: [{
					type: 'slider', //图表下方的伸缩条
					show: true, //是否显示
					realtime: true, //拖动时，是否实时更新系列的视图
					start: 80, //伸缩条开始位置（1-100），可以随时更改
					end: 100, //伸缩条结束位置（1-100），可以随时更改
        }],
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [],
      },
    };
  },
  mounted() {
    this.selectCoin = this.coins[0].value
    this.selectPlatforms = [this.platforms[0].value,this.platforms[1].value]
    this.myEcharts();
    // this.queryClick()
  },
  methods: {
    queryClick(){
      if(!this.selectCoin){
        this.$message('请选择币种');
        return
      }
      if(this.selectPlatforms.length < 2){
        this.$message('请至少选择两个交易所');
        return
      }
      this.chartsOption.legend.data = []
      this.chartsOption.series = []
      this.reqeustData(this.selectPlatforms[0],this.selectPlatforms[1]);
      this.reqeustData(this.selectPlatforms[1],this.selectPlatforms[0]);
    },
    reqeustData(exbuy,exsell){
      let coin = this.selectCoin
      var timestart = Date.parse(this.selectDate[0])/1000
      var timeend = Date.parse(this.selectDate[1])/1000 +24*60*60-1

      var url = this.$apiUrl.getPriceDiffRatioList;
      let data = {
        coin:coin,
        quote:'USDT',
        exbuy: exbuy,
        exsell: exsell,
        timestart:timestart,
        timeend:timeend,
        timegap:60,
      }
      this.$ajax.get(url,data).then(res => {
        if (res.code == 0) {
          this.handlerData(res.data,exbuy,exsell)
        }
      });
    },
    handlerData(data,exbuy,exsell){
      let timeList = []
      let seriesData = []
      for (let index = 0; index < data.length; index++) {
        let item = data[index];
        let timeStr = util.formatDate.format(new Date(item.datets*1000), 'dd hh:mm:ss')
        timeList.push(timeStr)
        seriesData.push(item.ratio)
      }
      this.chartsOption.xAxis.data = timeList
      let title = exbuy+"买"+exsell+"卖"
      let seriesItem ={
            name: title,
            data: seriesData,
            type: "bar",
          }
      this.chartsOption.series.push(seriesItem)
      this.chartsOption.legend.data.push(title)
      this.myChart.setOption(this.chartsOption);
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("main"));
      // 使用刚指定的配置项和数据显示图表。
      // this.myChart.setOption(this.chartsOption);
    },
  },
};
</script>
<style scope="scope" lang="scss">
.page {
  background-color: #fff;
}
.screen-bg {
  padding: 20px;
}
.item{
	margin: 10px 10px;
}
.echarts {
  width: 100%;
  height: 600px;
}
</style>



