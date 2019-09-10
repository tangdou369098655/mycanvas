<template>
  <div class="home">
    <input type="file" @change="onChange">
    <img alt="Vue logo" :src="mysrc">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  
  components: {
    HelloWorld
  },
  data() {
    return {
      mysrc: ''
    }
  },
  methods: {
    onChange(e) {
      this.mysrc = window.URL.createObjectURL(e.target.files[0])
    }
  }
}
</script>
