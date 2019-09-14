<template>
    <div class="mycanvas-container">
        <div class="left">
            <p>展示视口</p>
            <div class="myshow">
                <img :src="mysrc" alt="" width="100%">
                <!-- <div id="canvas" style="width:100%;height:100%" class="mycanvas"></div> -->
            </div>
        </div>
        <div class="center">
            <p>操作视口</p>
            <div class="myedit">
                <!-- <img src="@/assets/jia.svg" alt=""> -->
                <img :src="mysrc" alt="" width="100%">
                <div id="canvas" style="width:100%;height:100%" class="mycanvas"></div>
            </div>
        </div>
        <div class="right">
            <img src="" alt="" class="mybutton">
            <input type="file" class="mybutton" @change="onChange">
            <button class="mybutton">新增红色方块</button>
            <button class="mybutton">放大缩小红色方块</button>
            <button class="mybutton">拖拽红色方块</button>
            <button class="mybutton">保存所有新增</button>
        </div>
    </div>
</template>

<script>
import jiaIcon from './jia.svg'
    export default {


        data() {
            return {
                mysrc: ''
            }
        },
        methods: {
            // 上传图片1
            onChange(e) {
                this.mysrc = window.URL.createObjectURL(e.target.files[0])
            }
            // 上传图片2
        },
        mounted() {
            // window.onload = function () {
                var canvas = document.getElementById("canvas");
            // };
            var canvasWidth = 1000;
            var canvasHeight = 1000;
            var allDivNum = 1;
            var CanvasExt = {
                drawRect: function (canvas) { //参数canvas--所画素材框的区域
                    var that = this;

                    // canvas 的矩形框
                    var canvasRect = canvas.getBoundingClientRect();
                    // 矩形框的左上角坐标
                    var canvasLeft = canvasRect.left;
                    var canvasTop = canvasRect.top;
                    var x = 0;
                    var y = 0;

                    // 鼠标点击按下事件,画图准备
                    $(document).on('mousedown', '#canvas', function (e) {
                        // 解决修改时已存在素材框等，删除后再新增存在id重复问题
                        var date = new Date().getTime();
                        var id = "newDiv" + date + parseInt(Math.random() * 10);

                        var divEle = "";
                        // x y为鼠标的落点
                        x = e.clientX - canvasLeft;
                        y = e.clientY - canvasTop;

                        //创建div
                        divEle = document.createElement('div');
                        divEle.setAttribute("id", id);

                        canvas.append(divEle)
                        divEle.style.top = y + "px";
                        divEle.style.left = x + "px";

                        // 绑定删除操作
                        var menu = new BootstrapMenu('#' + id, {
                            actions: [{
                                name: '删除',
                                onClick: function () {
                                    // del(id);
                                    canvas.removeChild(divEle);
                                    console.log(e)
                                    console.log(id)
                                    // console.log(divEle)
                                }
                            }]
                        });
                        var tx = 0;
                        var ty = 0;
                        var twidth = 0;
                        var theight = 0;

                        // 添加拖拽操作
                        divEle.onmousedown = function (e) {
                            e.stopPropagation(); // 阻止时间冒泡
                            var divEleRect = this.getBoundingClientRect();
                            var divEleLeft = e.clientX - divEleRect.left;
                            var divEleTop = e.clientY - divEleRect.top;

                            this.onmousemove = function (e) {
                                e.stopPropagation();
                                tx = e.clientX - canvasLeft - divEleLeft;
                                ty = e.clientY - canvasTop - divEleTop;
                                // 重新获取当前对象的宽和高
                                twidth = document.getElementById(id).style.width;
                                twidth = parseInt(twidth);
                                theight = document.getElementById(id).style.height;
                                theight = parseInt(theight);
                                // 边界检测
                                if (tx <= 0) {
                                    tx = 0;
                                    this.style.left = 0 + "px";
                                } else if (tx + twidth > canvasWidth) {
                                    tx = canvasWidth - twidth;
                                    this.style.left = (canvasWidth - twidth) + "px";
                                } else {
                                    this.style.left = tx + "px";
                                }
                                if (ty <= 0) {
                                    ty = 0;
                                    this.style.top = 0 + "px";
                                } else if ((ty + theight) > canvasHeight) {
                                    y = canvasHeight - theight;
                                    this.style.top = (canvasHeight - theight) + "px";
                                } else {
                                    this.style.top = ty + "px";
                                }
                            }
                            this.onmouseup = function (e) {
                                var id = $(this).attr("id");
                                e.stopPropagation();
                                this.onmousemove = null;
                            }
                        };

                        //鼠标移动事件，画图
                        var width = 0;
                        var height = 0;
                        canvas.onmousemove = function (e) {
                            e.stopPropagation();
                            // width height是鼠标移动末尾距鼠标起始位置的差值
                            width = e.clientX - canvasLeft - x;
                            height = e.clientY - canvasTop - y;
                            divEle.style.width = width + "px";
                            divEle.style.height = height + "px";

                            var tw = e.clientX - canvasLeft;
                            var th = e.clientY - canvasTop;
                            if (tw >= (parseInt(canvasWidth) - 7) || th >=
                                (parseInt(canvasHeight) - 7)) { // 比canvas少3px,为了易于判断

                                allDivNum++;
                                divEle.innerHTML = `<img src=${jiaIcon} alt=" ${allDivNum}
                                    " width="100%">`;
                                canvas.onmousemove = null;
                                canvas.onmouseup = null;
                                return;
                            }
                        }
                        canvas.onmouseup = function (e) {
                            if (width < 10 || height < 10) {
                                canvas.removeChild(divEle);
                            } else {
                                allDivNum++;
                                divEle.innerHTML = `<img src=${jiaIcon} alt=" ${allDivNum}
                                    " width="100%">`;
                            }
                            e.stopPropagation();
                            canvas.onmousemove = null;
                        }
                    });
                }
            };
            
                CanvasExt.drawRect(canvas);
                // 取消默认右击事件
                document.oncontextmenu = function (e) {
                    e.preventDefault();
                }
        }
    }
</script>
<style lang="less" scoped>
    // 设置绘图样式1
    body {
        user-select: none;
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