<template>
  <div class="index" >
    <div class="editor" id="editor" v-show="showEditor">
      <div class="boxtitle">
        J1盒子场景编辑器
      </div>
      <div class="boxtool">
        <div class="iconbox cannotselect"><img src="../../assets/edit/save.png" @click="saveEdit"></div>
        <div class="iconbox cannotselect"><img src="../../assets/edit/choose.png" @click="openAnimation"></div>
      </div>
      <div class="container">
        <div id="mycanvas" class="mycanvas" :style="{height: canvasHeight}">
          <!-- 文字编辑器的盒子 -->
          <div class="textbox" v-show="showTextBox">
            <span class="close-text cannotselect" @click="closeTextBox">x</span>
              <div class="text-titlebox cannotselect">
                编辑文本
              </div>
              <textarea cols="30" rows="10" class="mytextarea" v-model="mytext"></textarea>
              <div class="text-select">
                <p class="cannotselect">文字大小</p>
                <select class="myselect" id="myselect">
                  <option :value="fontSize" v-for="(fontSize, index) in fontSizeArr" :key="index">{{fontSize}}</option>
                </select>
              </div>
              <div class="text-color">
                <p class="cannotselect">颜色</p>
                <div class="colorbox" :style="{background: textColor}" @click="showPickerBox"></div>
              </div>
              <div class="pickerbox" v-show="showColorPicker"></div>
            </div>
          <!-- <div class="layerbox cannotselect" @mousedown.stop="startMove($event)" @mouseup="endMove($event)">
            <div class="toscale cannotselect"></div>
            <div class="torotate cannotselect"></div>
            <div class="todelete cannotselect"></div>
            {{defaultWords}}
          </div> -->
          <div class="layerbox cannotselect" @mousedown.stop="startMove($event)" @mouseup="endMove($event)" v-for="(layerBox, index) in layerBoxs" :key="index"
           :style="{width: layerBox.width*coefficient + 'px',height: layerBox.height*coefficient + 'px',background: 'url(' + layerBox.iconUrl + ')'}">
            <div class="toscale cannotselect"></div>
            <div class="torotate cannotselect"></div>
            <div class="todelete cannotselect"></div>
            {{defaultWords}}
          </div>
        </div>
        <div id="righttool" class="right-tool" :style="{height: canvasHeight}">
          <div class="coverbox">
            <div class="coverage cannotselect" v-for="(selected, index) in selectedMaterial" :key="index">
              <div class="coverage-img">
                <span class="close-span" @click="delMaterial(index)">x</span>
                <img :src="selected.iconUrl" alt="图层" class="selectedimg">
              </div>
              <div class="coverage-name">{{selected.title}}</div>
            </div>
          </div>
          <div class="tool-add cannotselect"><img src="../../assets/edit/add_material.png" @click="addMaterial"></div>
        </div>
      </div>
    </div>
    <div class="setanimation" v-show="showAnimation">
      <div class="boxtitle">
        动画设置
        <div class="closebox cannotselect" @click="toClose">x</div>
      </div>
      <div class="boxtool">
        <div class="boxtool-name" :style="{height: canvasHeight}">动效选择</div>
      </div>
      <div class="choosees" >
        <div class="animatekind">
          <div class="animatekind-list animatekindactive">横向动画</div>
          <div class="animatekind-list">横向动画</div>
        </div>
        <div class="animatekinddetail">
          <div class="animatekind-list">横向摆动</div>
          <div class="animatekind-list">横向抖动</div>
        </div>
        <div class="animatebox">
          <div class="animatebox-container">

          </div>
        </div>
        <div class="animatechoosed">
          <div class="animatekind-list animatekind-list-edit">
            <span class="animatekind-list-cont">横向摆动横向摆动横向摆动横向摆动</span>
            <span class="animatekind-list-del cannotselect">x</span>
          </div>
          <div class="animatekind-list animatekind-list-edit">
            <span class="animatekind-list-cont">横向摆动横向摆动横向摆动横向摆动</span>
            <span class="animatekind-list-del cannotselect">x</span>
          </div>
        </div>
      </div>
    </div>
    <div class="choosematerial" v-show="showMaterial">
      <div class="boxtitle">
        添加素材
        <div class="closebox cannotselect" @click="toClose">x</div>
      </div>
      <div class="boxtool">
        <div class="boxtool-name">素材分类</div>
        <div class="boxtool-search">
          <input class="mysearch" type="text" placeholder="搜索图层名字或者ID">
          <div class="searchicon"><img src="../../assets/edit/search.png" alt=""></div>
        </div>
      </div>
      <div class="choosees" >
        <div class="animatekind">
          <div :class="{animatekindactive: index == 0}" class="animatekind-list-m cannotselect" v-for="(material, index) in materialList" :key="index" @click="selectMaterial(material.id,index)">{{index}}</div>
          
        </div>
        <div class="animatebox materialbox">
          <div class="materialbox-img cannotselect" v-for="(singleMaterial, index) in singleMaterials" :key="index">
            <div class="materialbox-img-top" @click="getMaterial(singleMaterial)">
              {{index}}
              <img :src="singleMaterial.iconUrl" class="materialimg">
            </div>
            <div class="materialbox-img-desc">{{singleMaterial.title}}</div>
          </div>
        </div>
        <div class="animatechoosed">
          <div class="coverbox">
            <div class="coverage" v-for="(selected, index) in selectedMaterial" :key="index">
              <div class="coverage-img">
                <span class="close-span" @click="delMaterial(index)">x</span>
                <img :src="selected.iconUrl" alt="图层" class="selectedimg">
              </div>
              <div class="coverage-name">{{selected.title}}</div>
            </div>
          </div>
          <div class="comfirmadd cannotselect" @click="addSelected">
            确认添加
          </div>
        </div>
      </div>
    </div>
    <div class="myloading" v-show="showLoading">
      <div class="loadingbox">
        <img src="../../assets/edit/loading.png" style="width: 200px;height: auto;">
      </div>
    </div>
  </div>
</template>

<script>
import "a-color-picker";
import anime from 'animejs'
export default {
  name: "pcedit",
  components: {},
  data() {
    return {
      angleCoefficient: 180 / Math.PI, //角度系数，常量
      mycanvas: null,
      borderTarget: null, //被选中的元素
      showEditor: true,
      showAnimation: false,
      showMaterial: false,
      showColorPicker: false, //js取色盘
      showTextBox: false, //字体选择框
      showLoading: false, //加载中。。。
      canMove: false,
      startX: null,
      startY: null,
      endX: null,
      endY: null,
      scale: 1,
      rotate: 0,
      startAngle: 0, //开始旋转时，一个边与x轴的角度
      canvasHeight: 0,
      coefficient: 0, //缩小系数
      scaleX: null,
      scaleY: null,
      rotateX: null,
      rotateY: null,
      targetBox: [], //当前选中的盒子
      textColor: "#C4292D",
      textSizeBox: null, //选择字体的盒子
      materialList: [], //素材种类
      singleMaterials: [], //某种素材
      selectedMaterial: [], //被选中的素材
      layerBoxs: [], //画布中的所有盒子（选择素材那里点确认，就等于selectedMaterial）
      isBgLayer: false, //是否背景图层，是的话就不让他移动

      textboxWidth: 0,
      textboxHeight: 0,
      fontSizeArr: [],
      mytext: " ", //当前素材的文字
      defaultWords: "helloworld" //永远为' '
    };
  },
  created() {
    for (let i = 0; i < 150; i++) {
      if (i >= 12) this.fontSizeArr.push(i);
    }
    this.getData();
  },
  mounted() {
    let _this = this;

    // AColorPicker.createPicker('div.colorbox')
    // .onchange = (picker)=>{
    //   console.log(picker.color)
    // }
    this.openColorPicker();
    this.textSizeBox = document.querySelector(".textbox");
    document.querySelector("#myselect").onchange = function(e) {
      console.log(e.target.value);
      _this.changeFont(null, e.target.value);
    };

    this.mycanvas = document.querySelector("#mycanvas");

    //获取比例系数
    _this.setHeight();
    window.onresize = function() {
      _this.setHeight();
    };

    //监听键盘事件
    document.onclick = function(event) {
      console.log(event);
    };

    //防止用户拖动过快造成的bug
    document.onmouseup = () => {
      this.canMove = false;
      document.onmousemove = null;
    };
    this.mycanvas.onmouseup = () => {
      this.canMove = false;
      document.onmousemove = null;
    };
    // this.targetAnime();
    // this.targetAnime2();
  },
  watch: {
    mytext: function(newV, oldV) {
      this.targetBox.lastChild.data = newV;
    }
  },
  methods: {
    init() {},
    getData() {
      // this.$mywxhttp("editor/getTags", {}, "get")
      //   .then(res => {
      //     this.$deconsole(res);
      //     this.materialList = res.data;
      //     this.selectMaterial(res.data[0].id, 0);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      this.materialList = [0,1,2,3,4,5];
      this.selectMaterial();
    },
    selectMaterial(id, index) {
      let boxs = document.querySelectorAll(".animatekind-list-m");
      for (let i = 0; i < boxs.length; i++) {
        boxs[i].classList.remove("animatekindactive");
      }
      if (boxs[index]) {
        boxs[index].classList.add("animatekindactive");
      }
      this.showLoading = true;
      // this.$mywxhttp(
      //   "editor/getTagLayer",
      //   {
      //     tagId: id
      //   },
      //   "get"
      // ).then(res => {
      //   this.$deconsole(res);
      //   this.singleMaterials = res.data;
      //   this.showLoading = false;
      // });
      let materialData = [
        {'title': '图片','iconUrl': require('../../assets/img/1.png'),'width': 588,'height': 541},
        {'title': '图片','iconUrl': require('../../assets/img/2.png'),'width': 463,'height': 500},
        {'title': '图片','iconUrl': require('../../assets/img/3.png'),'width': 550,'height': 400},
        {'title': '图片','iconUrl': require('../../assets/img/4.png'),'width': 876,'height': 784},
        {'title': '图片','iconUrl': require('../../assets/img/5.png'),'width': 400,'height': 200},
        {'title': '图片','iconUrl': require('../../assets/img/6.png'),'width': 132,'height': 99},
        {'title': '图片','iconUrl': require('../../assets/img/7.png'),'width': 800,'height': 520},
        {'title': '图片','iconUrl': require('../../assets/img/8.png'),'width': 800,'height': 800},
        {'title': '图片','iconUrl': require('../../assets/img/9.png'),'width': 188,'height': 100},
        {'title': '图片','iconUrl': require('../../assets/img/10.png'),'width': 930,'height': 600},
      ];
      this.singleMaterials = materialData;
      console.log(this.singleMaterials)
      this.showLoading = false;
    },
    //动态设置画布宽高
    setHeight() {
      let mycanvas = document.querySelector("#mycanvas");
      // let righttool = document.querySelector('#righttool');
      // mycanvas.offsetWidth / this.canvasHeight == 1920 / 1080
      this.canvasHeight = (mycanvas.offsetWidth * 1080) / 1920 + "px";
      this.coefficient = mycanvas.offsetWidth / 1920;
      console.log("缩小系数", this.coefficient);
    },
    //开始移动
    startMove(e) {
      console.log("start", e);
      this.canMove = true;
      this.startX = e.clientX;
      this.startY = e.clientY;

      // 设置字体盒子位置

      // this.mytext = ""; //清空上次输入的字
      this.textSizeBox.style.top = e.clientY - 110 + 50 + "px";
      this.textSizeBox.style.left = e.clientX + 50 + "px";

      //去掉所有边框以及恢复zIndex
      let allLayerbox = document.querySelectorAll(".layerbox");
      for (let i = 0; i < allLayerbox.length; i++) {
        this.removeBorder(allLayerbox[i]);
        allLayerbox[i].style.zIndex = 1;
      }

      //隐藏所有操作按钮
      for (let i = 0; i < allLayerbox.length; i++) {
        for (let j = 0; j < allLayerbox[i].children.length; j++) {
          this.hideTarget(allLayerbox[i].children[j]);
        }
        // console.log(allLayerbox[i].children)
      }
      //获取当前操作按钮
      let controlButtons = null;
      if (e.target.className.split(" ")[0] == "layerbox") {
        controlButtons = e.target.children;
      } else {
        controlButtons = e.target.parentNode.children;
      }
      //设置行高
      controlButtons[0].parentNode.style.lineHeight =
        controlButtons[0].parentNode.offsetHeight + "px";

      //设置旋转操作按钮的位置
      for (let i = 0; i < controlButtons.length; i++) {
        if (controlButtons[i].className.indexOf("torotate") != -1) {
          controlButtons[i].style.top =
            controlButtons[i].parentNode.offsetHeight / 2 - 5 + "px";
        }
      }

      //为当前图层显示操作按钮
      for (let i = 0; i < controlButtons.length; i++) {
        this.showTarget(controlButtons[i]);
      }

      if (e.target.className.split(" ")[0] == "torotate") {
        //把整个旋转看成三个点形成两个三角形
        //旋转的关键点：把第二个点（鼠标第一次点击的点）与第一个点（中心点）放在x轴上，这样起始的角度永远为0；
        this.$deconsole("旋转");
        this.borderTarget = e.target.parentNode;

        let start = {};
        start = this.getCenter(event.target.parentNode);
        this.docMouseMove(e.target.parentNode, "rotate", start.x, start.y);
      } else if (e.target.className.split(" ")[0] == "toscale") {
        this.$deconsole("缩放");
        this.borderTarget = e.target.parentNode;

        this.canMove = true;
        this.scaleX = e.clientX;
        this.scaleY = e.clientY;
        let start = {};
        start = this.getCenter(event.target.parentNode);
        this.docMouseMove(e.target.parentNode, "scale", start.x, start.y);
      } else if (e.target.className.split(" ")[0] == "todelete") {
        this.$deconsole("删除未实现");
        this.borderTarget = e.target.parentNode;

        this.canMove = true;
        this.scaleX = e.clientX;
        this.scaleY = e.clientY;
        let start = {};
        start = this.getCenter(event.target.parentNode);
        this.docMouseMove(e.target.parentNode, "scale", start.x, start.y);
      } else if (e.target.className.split(" ")[0] == "layerbox") {
        this.borderTarget = e.target;
        this.showTextBox = true;
        this.$deconsole("平移");
        this.docMouseMove(
          e.target,
          "move",
          e.target.offsetLeft,
          e.target.offsetTop
        );
      } else if (e.target.className.split(" ")[0] == "textbox") {
        //让里面的盒子也可以自由移动
        this.borderTarget = e.target;

        this.$deconsole("平移");
        // this.docMouseMove(e.target,'move',e.target.offsetLeft,e.target.offsetTop)
      }

      this.targetBox = this.borderTarget;
      //为当前盒子添加border
      this.addBorder(this.borderTarget);
      //设置当前盒子的显示优先级zIndex
      this.targetBox.style.zIndex = 2;
    },
    //结束移动
    endMove(e) {
      // console.log('end',e)
      this.canMove = false;
      this.endX = e.clientX;
      this.endY = e.clientY;
    },
    docMouseMove(target, type, originX, originY) {
      let moveTarget = target;
      let scaleTarget = target;
      let rotateTarget = target;
      let oldScale = this.getTransform(scaleTarget.style.transform).scale; //起始缩放比例
      let oldRotate = this.getTransform(scaleTarget.style.transform).rotate; //起始缩放比例

      // console.log('起始坐标',type,originX,originY)
      document.onmousemove = $event => {
        this.showTextBox = false;
        if (this.canMove) {
          //位移
          if (type == "move") {
            moveTarget.style.left =
              originX + (event.clientX - this.startX) + "px";
            moveTarget.style.top =
              originY + (event.clientY - this.startY) + "px";
          } else if (type == "scale") {
            let scaleNum = event.clientX - this.scaleX;
            if (oldScale + scaleNum / 100 <= 0.2) {
              return;
            } else {
              this.scale = oldScale + scaleNum / 100;
            }

            scaleTarget.style.transform =
              "rotate(" +
              oldRotate +
              "deg)" +
              " " +
              "scale(" +
              this.scale +
              ")";
          } else if (type == "rotate") {
            // console.log(originX,originY,this.startX,this.startY,event.clientX,event.clientY);
            // console.log(Math.atan((this.startY - originY)/(this.startX - originX)) * this.angleCoefficient);
            // console.log(Math.atan((event.clientY - originY)/(event.clientX - originX)) * this.angleCoefficient);
            //初始角度

            let startAngle = Math.abs(
              Math.atan(
                Math.abs(this.startY - originY) /
                  Math.abs(this.startX - originX)
              ) * this.angleCoefficient
            );
            //运动角度
            let endAngle = 0;
            // endAngle = Math.abs(Math.atan((event.clientY - originY)/(event.clientX - originX)) * this.angleCoefficient);
            endAngle = Math.abs(
              Math.atan(
                Math.abs(originY - event.clientY) /
                  Math.abs(event.clientX - originX)
              ) * this.angleCoefficient
            );
            if (event.clientX <= originX && event.clientY <= originY) {
              console.log(1);
              this.rotate = endAngle - 0;
            } else if (event.clientX >= originX && event.clientY <= originY) {
              console.log(2);
              this.rotate = 180 - 0 - endAngle;
            } else if (event.clientX >= originX && event.clientY >= originY) {
              console.log(3);
              this.rotate = 90 + endAngle + (90 - 0);
            } else {
              console.log(startAngle, "+", endAngle);
              this.rotate = 360 - 0 - endAngle;
              console.log(4);
            }
            rotateTarget.style.transform =
              "rotate(" +
              this.rotate +
              "deg)" +
              " " +
              "scale(" +
              oldScale +
              ")";
          }
        } else {
        }
      };
    },
    //获取transform里面的scale和rotate的值
    getTransform(transform) {
      // let transform = 'rotate(12.1237deg) scale(1.1)';
      let rotatestart = transform.indexOf("rotate(");
      let rotateend = transform.indexOf("deg", rotatestart);
      let rotate = 0;

      if (rotatestart !== -1) {
        rotate = transform.slice(rotatestart + "rotate(".length, rotateend);
      }
      let scalestart = transform.indexOf("scale(");
      let scaleend = transform.indexOf(")", scalestart);
      let scale = 1;
      if (scalestart !== -1) {
        scale = transform.slice(scalestart + "scale(".length, scaleend);
      }

      let tempData = {};
      tempData.rotate = Number(rotate);
      tempData.scale = Number(scale);
      return tempData;
    },
    getCenter(target) {
      let obj = {
        x: target.offsetLeft + target.offsetWidth / 2,
        y: target.offsetTop + target.offsetHeight / 2 + 110
      };
      return obj;
    },
    addBorder(target) {
      target.classList.add("redborder");
    },
    removeBorder(target) {
      target.classList.remove("redborder");
    },
    showTarget(target) {
      target.style.display = "block";
    },
    hideTarget(target) {
      target.style.display = "none";
    },
    //保存编辑
    saveEdit() {
      html2canvas(document.querySelector("#editor"), {
        useCORS: true,
        logging: true
      }).then(function(canvas) {
        console.log(canvas.toDataURL());
      });
    },
    //打开选择动画页面
    openAnimation() {
      setTimeout(() => {
        this.showEditor = false;
        this.showMaterial = false;
      }, 550);

      this.showAnimation = true;
    },
    //进入添加素材页面
    addMaterial() {
      setTimeout(() => {
        this.showEditor = false;
        this.showAnimation = false;
      }, 550);

      this.showMaterial = true;
    },
    //删除素材
    delMaterial(index) {
      console.log(index);
      this.selectedMaterial.splice(index, 1);
    },
    clearMaterial(index) {
      this.selectedMaterial[index] = {};
      console.log(this.selectedMaterial);
    },
    //添加选中素材
    addSelected() {
      this.layerBoxs = this.selectedMaterial;
      this.toClose();
    },
    getMaterial(material) {
      this.selectedMaterial.push(material);
    },
    toClose() {
      this.showEditor = true;
      this.showAnimation = false;
      this.showMaterial = false;
    },
    showPickerBox() {
      this.showColorPicker = !this.showColorPicker;
    },
    openColorPicker() {
      AColorPicker.createPicker("div.pickerbox").onchange = picker => {
        // console.log(picker.color)
        this.textColor = picker.color;
        this.changeFont(picker.color, null);
      };
    },
    changeFont(color, fontSize) {
      if (color) {
        this.targetBox.style.color = color;
      }
      if (fontSize) {
        this.targetBox.style.fontSize = fontSize + "px";
      }
    },
    closeTextBox() {
      this.showTextBox = false;
    },
    targetAnime(target,duration,){
      anime({
        targets: '.layerbox',
        translateX: 250,
        direction: 'alternate',
        easing: 'linear',
        duration: 1000,
        loop: true
      });
    },
    targetAnime2(target,duration,){
      anime({
        targets: '.testbox2',
        translateX: 250,
        direction: 'alternate',
        duration: 1000,
        easing: 'linear',
        loop: true
      });
    },
    animePause(animeSingle){
      animeSingle.pause;
    },
    animePause(){
      animeSingle.play;
    },
    dealString(str){
      if(str == 'translationX'){
        return 'translateX'
      }else if(str == 'translationY'){
        return 'translateY'
      }
    },
    
  }
};
</script>

<style scoped>
.index {
  /* position: fixed; */
  width: 100%;
  height: 100%;
  /* left: 0; */
  /* bottom: 0; */
}
.layerbox {
  background-color: grey;
  position: absolute;
  left: 0px;
  top: 0px;
  cursor: move;
  z-index: 2;
  text-align: center;
  font-size: 25px;
  background-image: url("../../assets/tools/load.jpg");
  background-size: 100% 100% !important;
  /* box-sizing: border-box; */
}
.layerwordbox {
  background-color: grey;
  position: absolute;
  left: 0;
  top: 0;
  cursor: move;
  /* box-sizing: border-box; */
  z-index: 2;
}
.editor {
  width: 100%;
  height: 100%;
  background-color: #424242;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  overflow: scroll;
}
.toscale,
.torotate,
.todelete {
  font-size: 16px;
  width: 10px;
  height: 10px;
  position: absolute;
  display: none;
}
.toscale {
  right: -5px;
  top: -5px;
  cursor: crosshair;
  background-color: #333333;
  border: 1px solid #d6d6d6;
}
.torotate {
  width: 20px;
  left: -20px;
  /* top: 65px; */
  cursor: pointer;
  background: url("../../assets/edit/rotate.png");
  background-size: 100% 100%;
}
.todelete {
  right: -5px;
  bottom: -5px;
  cursor: crosshair;
  background-color: #333333;
  border: 1px solid #d6d6d6;
}
.mytextarea {
  display: block;
  width: 100%;
  height: 20%;
  border: 1px solid #c4c4c4;
  background: #454545;
  resize: none;
  border-radius: 5px 5px;
  color: #d7d7d7;
}
.textbox {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 226px;
  padding: 10px;
  text-align: left;
  background: #535353;
  border-radius: 5px 5px;
  z-index: 9999999;
}
.text-titlebox {
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: #d7d7d7;
  margin-bottom: 5px;
}
.text-select {
  width: 100%;
}
.myselect {
  display: block;
  width: 100%;
  background-color: #454545;
  border: 1px solid #c4c4c4;
  color: #d7d7d7;
}
.text-select p,
.text-color p {
  font-size: 14px;
  color: #d7d7d7;
  text-align: left;
}
.text-color {
  width: 100%;
}
.colorbox {
  width: 100%;
  height: 16px;
}
.mycanvas {
  position: relative;
  left: 0;
  top: 0;
  width: calc(100% - 200px);
  background-color: #000;
  float: left;
  overflow: hidden;
}
.right-tool {
  float: left;
  width: 200px;
  position: relative;
  right: 0;
  top: 0;
  background-color: #424242;
}
.boxtitle {
  width: 100%;
  height: 48px;
  line-height: 47px;
  text-align: center;
  font-size: 16px;
  color: #ffd7d7d7;
  background-color: #424242;
  border-bottom: 1px solid #000;
  position: relative;
}
.boxtool {
  width: 100%;
  height: 62px;
  background-color: #424242;
  text-align: left;
  border-bottom: 1px solid #000;
}
.closebox {
  position: absolute;
  right: 20px;
  top: 10px;
  width: 20px;
  height: 20px;
  background-color: #6b6b6b;
  line-height: 20px;
  cursor: pointer;
}
.close-text {
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  line-height: 10px;
  font-size: 16px;
  color: #c4c4c4;
  cursor: pointer;
}
.iconbox {
  width: 30px;
  height: 30px;
  margin: 15px;
  float: left;
}
.iconbox img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: block;
}
.coverbox {
  height: calc(100% - 60px);
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.coverbox::-webkit-scrollbar,
.setanimation::-webkit-scrollbar,
.materialbox::-webkit-scrollbar {
  display: none;
}
.comfirmadd {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #d7d7d7;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  cursor: pointer;
}
.tool-add {
  height: 60px;
  width: 100%;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  text-align: center;
  line-height: 60px;
}
.tool-add img {
  width: 30px;
  height: 30px;
  margin: 15px auto;
  display: block;
  cursor: pointer;
}
.coverage {
  width: 100%;
  height: 130px;
  padding: 20px 10px 5px;
  border-bottom: 1px solid #000;
}
.coverage-img {
  width: 100%;
  height: 81px;
  line-height: 81px;
  position: relative;
}
/* .coverage-img img {
    width: 73%;
    height: 81px;
    display: block;
    float: left;
  } */
.close-span {
  position: absolute;
  right: -5px;
  top: -50px;
  font-size: 16px;
  color: #d7d7d7;
  display: block;
  width: 27%;
  text-align: center;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.coverage-name {
  font-size: 12px;
  color: #d7d7d7;
  height: 32px;
  line-height: 32px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.boxtool-name {
  width: 200px;
  border-right: 1px solid #000;
  font-size: 14px;
  text-align: center;
  line-height: 62px;
  color: #d7d7d7;
  float: left;
}
.setanimation,
.choosematerial {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  /* overflow: hidden; */
  transform: translateX(-2710px);
  animation: leftmove 0.6s 1;
  animation-fill-mode: forwards;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  z-index: 99999999;
}
.myloading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999999999;
}
.loadingbox {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  /* line-height: 100%; */
}
.loadingbox img {
  position: absolute;
  margin: auto;
  top: -9999px;
  right: -9999px;
  bottom: -9999px;
  left: -9999px;
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes leftmove {
  0% {
    transform: translateX(-2710px);
  }
  100% {
    transform: translateX(0);
  }
}
.choosees {
  width: 100%;
  height: calc(100% - 110px);
  background-color: #424242;
}
.animatekind,
.animatekinddetail,
.animatebox,
.animatechoosed {
  width: 200px;
  height: 100%;
  background-color: #424242;
  border-right: 1px solid #000;
  float: left;
}
.animatebox {
  width: calc(100% - 600px);
  background-color: #282828;
  padding-top: 10%;
}
.materialbox {
  width: calc(100% - 400px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  align-content: flex-start;
  overflow: scroll;
}
.materialbox-img {
  width: 230px;
  height: 130px;
  border-radius: 2px;
  margin-right: 20px;
  margin-bottom: 10px;
}
.animatebox-container {
  width: 80%;
  height: 80%;
  margin: 0 auto;
  background-color: gold;
}
.animatekind-list,
.animatekind-list-m {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #d7d7d7;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #000;
  text-align: left;
  padding-left: 20px;
  cursor: pointer;
}
.animatekindactive {
  background-color: #6b6b6b;
}
.animatekind-list-edit {
  text-align: left;
  padding: 0 10px;
}
.animatekind-list-cont {
  float: left;
  width: 70%;
  color: #d7d7d7;
  margin-right: 10%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.animatekind-list-del {
  width: 20%;
  float: left;
  color: #d7d7d7;
  font-size: 14px;
  cursor: pointer;
}
.boxtool-search {
  position: relative;
  float: left;
  height: 100%;
}
.mysearch {
  border: none;
  width: 662px;
  height: 40px;
  display: block;
  margin: 11px 0 0 20px;
  background-color: #535353;
  border-radius: 20px;
  color: #d7d7d7;
  padding-left: 20px;
}
.mysearch::-webkit-input-placeholder {
  color: #d7d7d7;
}
.searchicon {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 20px;
  top: 19px;
  cursor: pointer;
}
.searchicon img {
  width: 100%;
  height: 100%;
  display: block;
}
.redborder {
  border: 1px solid #d6d6d6;
}
.materialbox-img-top {
  width: 100%;
  height: 100px;
  border: 1px solid #535353;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.materialbox-img-desc {
  width: 100%;
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 14px;
  color: #d7d7d7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.materialimg {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  top: -9999px;
  right: -9999px;
  bottom: -9999px;
  left: -9999px;
}
.selectedimg {
  position: absolute;
  max-width: 100%;
  max-height: 90%;
  margin: auto;
  top: -9999px;
  right: -9999px;
  bottom: -9999px;
  left: -9999px;
}
/* .testbox {
  animation: rotate 2s linear infinite;
} */
</style>
