<template>
  <div class="slide">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for='(item,index) in data' :key="index">
          <img :src="item" alt="">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  
  </div>
</template>

<script>
import Swiper from '../../static/swiper.min.js'
// import slide from './slide'
export default {
  name: 'slide',
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  mounted () {
    console.log(this.data)
    var swiper
    setTimeout(function () {
      swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30
      })
    }, 200)
    console.log(swiper)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../assets/css/swiper.min.css");
.swiper-container {
  width: 100%;
  margin: 0 auto;
}

.swiper-container img {
  width: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
