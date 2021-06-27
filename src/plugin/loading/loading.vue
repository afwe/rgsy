<template>
    <div class="loading" v-show="isShow">
        <div class="mask"></div>
        <div class="loading-body" 
            id="frame"
            v-for"pos in position"
            :style.left=pos.x
            :style.top=pos.y
            :style.transform=`rotate(${pos.rot})`
        >
        </div>
        <div class="loading-body"
            id="center"
        >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            position: [
                {rot:"45deg",x:"calc(50%-100px)",y:"calc(50%-100px)"},
                {rot:"135deg",x:"calc(50%+100px)",y:"calc(50%-100px)"},
                {rot:"135deg",x:"calc(50%-100px)",y:"calc(50%+100px)"},
                {rot:"45deg",x:"calc(50%+100px)",y:"calc(50%+100px)"}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .loading{
        height: 100%;
        width: 100%;
        position: relative;
    }
    .mask{
        height: 100%;
        width: 100%;
        z-index :1001;
    }
    .loading-body{
        z-index: 10001;
        /*-webkit-animation: loads 3s infinite;
        -moz-animation: loads 3s infinite;*/
        animation: loads 3s infinite;
    }
    #frame{
        width:200px;
        height:50px;
        border-radius: 10px;
    }
    #center{
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    @keyframes loads{
        0%{background-image:linear-gradient(to right,red,blue);}
        40%{background-image:linear-gradient(to right,yellow,green);}
        75%{background-image:linear-gradient(to right,blue,red);}
        90%{background-image:linear-gradient(to right,green,yellow);}
        100%{background-image:linear-gradient(to right,red,blue);}
    }
</style>