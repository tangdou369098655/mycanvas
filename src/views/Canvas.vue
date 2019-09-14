<template>
  <div class="mycanvas-container">
    <div class="left">
      <p>展示视口</p>
      <div class="myshow">
        <img :src="mysrc" alt width="100%" />
        <!-- <div id="canvas" style="width:100%;height:100%" class="mycanvas"></div> -->
      </div>
    </div>
    <div class="center">
      <p>操作视口</p>
      <div class="myedit" ref="myedit" @mousedown.prevent="onMousedown" @mousemove="onMousemove" @contextmenu.prevent="">
        <!-- <img src="@/assets/jia.svg" alt=""> -->
        <img :src="mysrc" />
        <span
          class="myedit-span"
          v-for="(item, index) in mydata"
          :key="index"
          :style="getSpanStyle(item)"
          @contextmenu.prevent="onContextmenu(item, $event)"
        ></span>
        <!-- <div id="canvas" style="width:100%;height:100%" class="mycanvas"></div> -->
      </div>
    </div>
    <div class="right">
      <img src alt class="mybutton" />
      <input v-show="0" ref="file" type="file" class="mybutton" @change="onChange" />
      <button class="mybutton" @click="selectFile">导入图片</button>
      <button class="mybutton">新增标注</button>
      <button class="mybutton">修改标注</button>
      <button class="mybutton">删除</button>
      <button class="mybutton">保存</button>
    </div>
    <div class="myMenu" v-show="mymenu.current" :style="mymenu.style">
      <!-- <button @click="onRemoveItem">删除</button> -->
      <ui-button type="primary" @click="onRemoveItem">删除</ui-button>
      <ui-select></ui-select>
      <select name="" id="">
        <option value="1">ceshi</option>
      </select>
    </div>
  </div>
</template>

<script>
import jiaIcon from "./jia.svg";
export default {
  data() {
    return {
      mysrc: "",
      mydata: [],
      mymenu: { current: null, style: { left: 0, top: 0 } }
    };
  },
  mounted() {
    document.addEventListener('mouseup', this.onMouseup)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.onMouseup)
  },
  methods: {
    getXY(e) {
      let rect = this.$refs.myedit.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    },
    // 上传图片1
    onChange(e) {
      this.mysrc = window.URL.createObjectURL(e.target.files[0]);
      e.target.value = ''
    },
    // 上传图片2,
    selectFile() {
      this.$refs.file.click();
    },
    onMousedown(e) {
      this.mymenu.current = null
      let { x, y } = this.getXY(e)
      this.currentItem = { x, y, w: 0, h: 0, now: Date.now() }
      this.startPos = { x, y }
      this.mydata.push(this.currentItem)
    },
    onMousemove(e) {
      if (!this.currentItem) return;
      let { x, y } = this.getXY(e)
      this.currentItem.w = Math.abs(x - this.startPos.x)
      this.currentItem.h = Math.abs(y - this.startPos.y)
    },
    onMouseup(e) {
      this.currentItem = this.startPos = null;
      this.mydata = this.mydata.filter(_ => _.w > 10 && _.h > 10)
    },
    onContextmenu(item, e) {
      this.mymenu = {
        current: item,
        style: {
          top: e.clientY + 'px',
          left: e.clientX + 'px'
        }
      }
    },
    onRemoveItem() {
      this.mydata.splice(this.mydata.indexOf(this.mymenu.current), 1)
      this.mymenu = { ...this.mymenu, current: null }
    },
    getSpanStyle(item) {
      return {
        width: `${item.w}px`,
        height: `${item.h}px`,
        top: `${item.y}px`,
        left: `${item.x}px`
      };
    }
  }
};
</script>
<style lang="less" scoped>
// 设置绘图样式1
body {
  user-select: none;
}

.myMenu {
  position: fixed;
  top: 400px;
  left: 400px;
  width: 100px;
  padding: 8px 0;
  background-color: #fff;
  > * {
    width: 100%;
  }
}

#canvas > div {
  /* border: 2px solid green; */
  position: absolute;
  background-color: transparent;
}

#canvas > div > span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: simsun;
  font-size: 9pt;
}

// 设置绘图样式2

.mycanvas-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .left,
  .center,
  .right {
    width: 300px;
    // height: 520px;
    margin: 20px;

    p {
      text-align: center;
    }

    .myshow,
    .myedit {
      width: 300px;
      // height: 500px;
      border: 1px solid #000;
      position: relative;
      .myedit-span {
        position: absolute;
        border: 1px dashed #fff;
        background: url("./jia.svg") no-repeat center center;
        background-size: contain;
      }

      .mycanvas {
        border: 1px solid pink;
        position: absolute;
        top: 0;
        left: 0;
      }

      img {
        width: 100%;
      }
    }
  }

  .right {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;

    .mybutton {
      margin-top: 20px;
      display: block;
    }
  }
}
</style>