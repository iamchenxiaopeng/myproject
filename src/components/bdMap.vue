<template>
 <div>
   <loading :showloading="showloading"></loading>
    <div :style="{width: width+'px',height: height+'px'}" id="bdmap">
      
    </div>
 </div>
</template>

<script>
import loading from './loading';
export default {
  name: 'bdMap',
  components: {
    loading,
  },
  props: {
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 500,
    },
    searchPlace: {
      type: String,
    }
  },
  data () {
    return {
      showloading: false,
      map: null,
      point: null,
      geolocation: null,
      mk: null,
      local: null
    }
  },
  created(){
    
  },
  mounted(){
    this.init();
  },
  watch: {
    searchPlace: function(newV,oldV){
      this.local.search(newV);
      console.log(newV)
    }
  },
  methods: {
    init(){
      this.map = new BMap.Map("bdmap");
      this.point = new BMap.Point(116.404, 39.915);
      this.map.centerAndZoom(this.point, 15);
      this.map.enableScrollWheelZoom(true);
      this.showloading = true;
      this.geolocation = new BMap.Geolocation();
      let _this = this;
      this.geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          //标记
          _this.mk = new BMap.Marker(r.point);
          _this.map.addOverlay(_this.mk);
          _this.map.panTo(r.point);
          _this.showloading = false;
          console.log(r)
          alert('您的位置：经度'+r.point.lng+',纬度'+r.point.lat);
        }
        else {
          alert('failed'+this.getStatus());
        }        
      });
      //地图检索
      this.local = new BMap.LocalSearch(this.map,   
      { renderOptions:{map: this.map, autoViewport: true}});  
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
