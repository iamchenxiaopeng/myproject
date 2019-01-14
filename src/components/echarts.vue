<template>
  <div class="hello">
    <div id="mycharts" style="width: 500px;height: 500px"></div>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
  name: 'echarts',
  components: {

  },
  data () {
    return {
      token: '',
    }
  },
  created(){

  },
  mounted(){
    var myChart = echarts.init(document.getElementById('mycharts')); 
                
    var option = {
        tooltip: {
            show: true
        },
        legend: {
            data:['销量','销量2']
        },
        xAxis : [
            {
                type : 'category',
                data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            }
        ],
        yAxis : [
            {
                type : 'value',
                
            }
        ],
        series : [
            {
                "name":"销量",
                "type":"line",
                "data":[5, 20, 40, 10, 10]
            },
            {
                "name":"销量2",
                "type":"bar",
                "data":[5, 20, 40, 10, 10, 20]
            }
        ]
    };
    myChart.setOption(option); 
  },
  methods: {
    init(){

    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
