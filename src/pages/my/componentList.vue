<template>
  <div class="full-block">
    <div style="padding-top: 100px"></div>
    <div id="qr1" style="margin-bottom: 50px">
      <qr class="myqr" qrId="qr1"></qr>
    </div>
    <div id="qr2">
      <qr class="myqr" qrId="qr2" qrMsg="..."></qr>
    </div>
    <div class="search-box">
      <input type="text" :placeholder="searchPlace" v-model="nowSearch"> 
      <span @click="search" class="cannotselect">搜索</span>
    </div>
    <div class="bdmap-container">
      <bd-map :searchPlace="searchPlace"></bd-map>
    </div>
  </div>
</template>

<script>
import bdMap from '../../components/bdMap';
import loading from '../../components/loading';
import qr from '../../components/qr';

export default {
  name: 'componentList',
  components: {
    bdMap,
    loading,
    qr
  },
  data () {
    return {
      searchPlace: '解放碑',
      nowSearch: '',
      showloading: false,
    }
  },
  created(){
    
  },
  mounted() {
    
  },
  methods: {
    init(){
        
    },
    search(){
      this.searchPlace = this.nowSearch;
    }
  },
  watch: {

  },
}
</script>

<style scoped lang="scss">
  $search-height: 50px;
    .full-block {
      .search-box {
        width: 300px;
        height: $search-height;
        margin: 0 auto;
        input,span {
          display: block;
          float: left;
        }
        input {
          border: 1px solid gray;
          width: 70%;
          height: $search-height;
        }
        span {
          display: inline-block;
          width: 30%;
          height: $search-height;
          font-size: 16px;
          line-height: $search-height;
          cursor: pointer;
        }
      }
      
      .bdmap-container {
        width: 500px;
        height: 500px;
        margin: 50px auto;
      }
      #qr1 {
        animation: qrmove 2s alternate infinite;
      }
      #qr2 {
        animation: qrmove 2s alternate infinite 1s;
      }
      @keyframes qrmove {
        0% {
          transform: translateX(0px);
        }
        100% {
          transform: translateX(1000px);
        }
      }
    }
    
</style>
