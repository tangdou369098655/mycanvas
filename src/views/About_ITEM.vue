<template>
  <Item :json="dataAll" />
</template>
<script>
import Item from "../components/Item";
export default {
  name: "about",
  components: {
    Item
  },
  data() {
    return {
      dataAll: {
        // 用户名称
        name: "哈哈",
        //用户编号
        Numbering: "23232",
        // 左右数量
        LeftQuantity: "100",
        RightQuantity: "100",
        //控制是否展开
        extend: true, //不填写默认为true展开
        // 下级
        children: [
          {
            name: "children1",
            extend: false,
            children: [
              {
                name: "children1"
              },
              {
                name: "children2"
              },
              {
                name: "children3"
              },
              {
                name: "children4"
              }
            ]
          },
          {
            name: "children2",
            extend: false,
            children: [
              {
                name: "children2"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>