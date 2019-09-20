<template>
   
</template>

<script>
const setTimeoutToPromise = duration => new Promise(resolve => {
    setTimeout(resolve, duration)
})
export default {
    data() {
        return {
            mysrc: true
        }
    },
    methods: {
        s1(a){
            console.log(a)
        },
        s2(a){
            console.log(a)
        },
        s3(a){
            console.log(a)
        },
        async s4(){
            this.s1(1)
            await setTimeoutToPromise(100).then(() => this.s2(2)).then()
            this.s3(3)
        }//输出顺序是132
    }
}
</script>