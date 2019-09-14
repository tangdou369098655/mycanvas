<template>
    <div class="mycanvas-container">
        <div class="left">
            <p>展示视口</p>
            <div class="myshow">
                <!-- <img :src="mysrc" alt="" width="100%"> -->
                <!-- <div id="canvas" style="width:100%;height:100%" class="mycanvas"></div> -->
            </div>
        </div>
        <div class="center">
            <p>操作视口</p>
            <div class="myedit">
                <!-- <img src="@/assets/jia.svg" alt=""> -->
                <!-- <img :src="mysrc" alt="" width="100%"> -->
                <div :style="canvasStyle" v-bind="canvasAttrs" class="mycanvas" @click="addMarker"></div>
            </div>
        </div>
        <div class="right">
            <img src="" alt="" class="mybutton">
            <input v-show="0" ref="file" type="file" class="mybutton" @change="onChange">
            <button class="mybutton" @click="selectFile">导入图片</button>
            <button class="mybutton">新增标注</button>
            <button class="mybutton">修改标注</button>
            <button class="mybutton">删除</button>
            <button class="mybutton">保存</button>
        </div>
    </div>
</template>

<script>
import jiaIcon from './jia.svg'
    export default {
        data() {
            return {
                mysrc: '', canvasStyle: {}, canvasAttrs: {}
            }
        },
        methods: {
            // 上传图片1
            onChange(e) {
                let file = e.target.files[0]
                let img = new Image()
                img.onload = () => {
                    this.canvasStyle = {
                        backgroundImage: `url(${img.src})`
                    }
                    this.canvasAttrs = {
                        width: `${img.naturalWidth}px`,
                        height: `${img.naturalHeight}px`
                    }
                }
                img.src = window.URL.createObjectURL(file)
                e.target.value = ''
            },
            // 上传图片2
            selectFile() {
                this.$refs.file.click()
            },
            /**
             * @param {MouseEvent} e
             */
            addMarker(e) {
               const canvas = this.$el.querySelector('canvas')
               const ctx = canvas.getContext('2d')
            //    鼠标位置
            let dx=e.clientX - canvas.getBoundingClientRect().left
            let dy = e.clientY - canvas.getBoundingClientRect().top
            const image = new Image()
            image.onload = () => {
                console.log()
                ctx.drawImage(image, dx, dy, 30, 30)
            }
            image.src = jiaIcon
            }
        }
    }
</script>
<style lang="less" scoped>
    // 设置绘图样式1
    body {
        user-select: none;
    }
    .mycanvas {
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: 100% 100%;
    }

    #canvas {
        // background-color: #AAAAAA;
        // position: relative;
        background-size: 100% 100%;
        // border: 2px solid blue;
    }

    #canvas>div {
        /* border: 2px solid green; */
        position: absolute;
        background-color: transparent;
    }

    #canvas>div>span {
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
            height: 520px;
            margin: 20px;

            p {
                text-align: center;
            }

            .myshow,
            .myedit {
                width: 300px;
                height: 500px;
                border: 1px solid #000;
                position: relative;

                .mycanvas {
                    border: 1px solid pink;
                    position: absolute;
                    top: 0;
                    left: 0;
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