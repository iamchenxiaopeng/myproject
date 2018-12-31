<template>
  <div class="fixed-container" v-if="showloading">
    <div style="font-size: 30px;color: red; margin: 300px auto">请稍等...</div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  components: {

  },
  props: ['showloading'],
  data () {
    return {
      token: '',
    }
  },
  created(){

  },
  mounted(){
    
  },
  watch:{
    
  },
  methods: {
    init(){

    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fixed-container {
    background-color: rgba(0, 0, 0, .5);
    z-index: 99999999999;
}
</style>
