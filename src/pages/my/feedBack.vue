<template>
  <div class="index">
      <div class="q-type" @click="toShowMask">
          <span>问题类型<span style="color: #E07267">*</span></span>
          <span style="margin-left: 1.5rem;">{{questionType}}</span>
          <img src="../../assets/tools/right.png">
      </div>
      <div class="areabox">
        <textarea class="mytextarea" v-model="myFeedBack" cols="30" rows="10" placeholder="输入您的意见或建议..."></textarea>
        <div class="numtip">
            {{myFeedBack.length}}/200
        </div>
      </div>
      <div class="mySubmit" @click="toSubmit(questionType,myFeedBack)">提交</div>
      <div class="myMask" @click="hideModule($event)" v-show="showMask">
        <div class="myalert">
            <div class="alertbox">功能建议</div>
            <div class="alertbox">使用咨询</div>
            <div class="alertbox noborder">软件问题</div>
            <div class="myCancel">取消</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'feedBack',
  components: {
  },
  data () {
    return {
        myFeedBack: '',
        wordLimit: 0,
        questionType: null,
        showMask: false,
        myalert: null,
        token: null,
    }
  },
  created(){
    let nowType = this.$usefulFn.GetUrlParam('type');
    let menuId = this.$usefulFn.GetUrlParam('menuId');
    let token = this.$usefulFn.GetUrlParam('token');
    this.token = this.$usefulFn.GetUrlParam('token');
  },
  mounted() {
    this.myalert = document.querySelector('.myalert');
  },
  methods: {
    init(){
        
    },
    getData(){
        
    },
    hideModule(e){
        if(e.target.className == 'myMask' || e.target.className == 'myCancel'){
            this.myalert.style.bottom = -3 + 'rem';
            setTimeout(() => {
                this.showMask = false;
            }, 550);
        }else {
            this.questionType = e.target.innerHTML;
            this.myalert.style.bottom = -3 + 'rem';
            setTimeout(() => {
                this.showMask = false;
            }, 550);
        }
    },
    toShowMask(){
        this.showMask = true;
        setTimeout(() => {
            this.myalert.style.bottom = 1.5 + 'rem';
        }, 100);
    },
    toHideMask(){
        this.showMask = true;
        setTimeout(() => {
            this.myalert.style.bottom = 1.5 + 'rem';
        }, 100);
    },
    toSubmit(questionType,content){
        if(!questionType){
            alert('请选择问题类型')
            return;
        }else if(!content){
            alert('请输入您的意见或建议')
            return;
        }
        alert('反馈成功!谢谢您的反馈');
        // this.$axios.get('app/web/feedbackCommit',{
        //     params: {
        //         content: content,
        //         quesType: questionType,
        //         Authorization: this.token
        //     },
        // })
        // .then((res)=>{
        //     
        //     alert(res.data.message)
        // })
        // .catch((error)=>{
        //     alert(JSON.stringify(error))
        // });
    },
    
    tip(){
        
    }
  },
  watch: {
    myFeedBack: function(curV,oldV){
      if(curV.length>200){
        this.myFeedBack = oldV;
      }
    }
  },
}
</script>

<style scoped>
    .index {
            background-color: #F8F8F8;
    }
    .q-type {
        width: 100%;
        padding: 0 0.2rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.32rem;
        color: #333333;
        text-align: left;
        font-weight: 600;
        box-sizing: border-box;
        border-bottom: 1px solid #F8F8F8;
        background-color: #fff;
    }
    .q-type span {
        
    }
    .q-type img {
        margin: 0;
        height: 0.55rem;
        float: right;
        margin-top: 0.25rem;
        opacity: .5;
    }
    .areabox {
        position: relative;
        width: 100%;
    }
    .mytextarea {
        background-color: #fff;
        border: none;
        width: 99%;
        margin-top: 0.2rem;
        font-size: 0.36rem;
    }
    .mytextarea::-webkit-input-placeholder {
        color:#999999;
        font-size: 0.28rem;
    }
    .numtip {
        position: absolute;
        right: 0.5rem;
        bottom: 0.3rem;
        font-size: 0.28rem;
        color: #999999;
    }
    .mySubmit {
        width: 7.1rem;
        height: 1rem;
        background-color: #DA5243;
        color: #fff;
        font-size: 0.36rem;
        line-height: 1rem;
        text-align: center;
        margin: 0.5rem auto 0;
        border-radius: 0.05rem 0.05rem;
    }
    .myMask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }
    .myalert {
        position: absolute;
        left: 0.5rem;
        bottom: -3rem;
        width: 6.5rem;
        background-color: #fff;
        border-radius: 0.2rem 0.2rem;
        transition: all .5s;
    }
    .alertbox {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.32rem;
        font-weight: 500;
        color: #000000;
        border-bottom: 1px solid #F6F6F6;
    }
    .noborder {
        border: none !important;
    }
    .myCancel {
        position: absolute;
        left: 0;
        bottom: -1.3rem;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        background-color: #DA5243;
        border-radius: 0.05rem 0.05rem;
        text-align: center;
        font-size: 0.4rem;
        font-weight: 500;
        color: #fff;
    }
</style>
