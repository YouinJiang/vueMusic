<template>
  <div class="recommends">
    <slide :data="slideData"></slide>
    <div class="recommendBox">
      <div class="recommendBoxGo" v-for='(item,index) in recommendList' @click="goCount($event,item.id)" :key='index'>
        <div class="recommendBoxImg">
          <img :src="item.picUrl" alt="">
        </div>
        <div class="recommendList">
          <div class="recommended-title">{{item.topTitle}}</div>
          <p class="recommended-info" v-for='(list,indexList) in item.songList' :key="indexList">
            <span class="song-index">{{indexList+1}}</span>
            <span class="song-name">{{list.songname}}</span>
            <span class="album-name">{{list.singername}}</span>
          </p>
          <div class="recommended-song">
            <i class="gxs-icon gxs-icon-listenCount">
              <img src="../assets/images/icon-song.png" alt="">
            </i>
            <div class="listenCount">{{item.listenCount}}</div>
          </div>
        </div>
        <div class="recommendJt">
          <img src="../assets/images/icon-right.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import slide from './slide'
export default {
  name: 'recommends',
  components: {
    slide
  },
  data () {
    return {
      slideData: [],
      recommendList: []
    }
  },
  beforeMount () {
    // 获取banner数据
    axios.get('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
      .then(response => {
        var data = response.request.response
        data = typeof data === 'string' ? JSON.parse(data) : data
        for (let i = 0; i < data.data.slider.length; i++) {
          this.slideData.push(data.data.slider[i].picUrl)
        }
      })
      .catch(function (response) {
        console.log('请联系管理员' + response)
      })

    // 获取recommend数据
    axios.get('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg')
      .then(e => {
        var data = e.request.response
        data = data.substring(data.indexOf('(') + 1)
        data = data.substring(0, data.lastIndexOf(')'))
        data = JSON.parse(data)
        this.recommendList = data.data.topList
        console.log(this.recommendList)
      })
      .catch(function (response) {
        console.log('请联系管理员' + response)
      })
  },
  mounted () {
  },
  methods: {
    goCount (e, val) {
      this.$store.commit('recommendId', val)
      this.$store.commit('setIsSearch', false)
      this.$router.push({ name: 'count' })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('setIsSearch', true)
    })
  },

  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.recommendBoxGo {
  width: 100%;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
  margin-top: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
}

.recommendBoxImg {
  width: 5.8rem;
  height: 5.8rem;
  overflow: hidden;
}

.recommendBox {
  padding-bottom: 2.2rem;
}

.recommendList {
  padding: .5rem .5rem;
  overflow: hidden;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.recommended-title {
  font-size: 0.75rem;
  padding-bottom: .2rem;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recommended-info {
  font-size: .6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: .8rem;
  line-height: 1rem;
}

.recommended-info .song-index {
  margin-right: .2rem;
  color: #c2c8d2;
}

.recommended-info .song-name {
  color: #fff;
}

.recommended-info .album-name {
  margin-left: .2rem;
  font-size: .6rem;
  color: #c2c8d2;
}

.recommended-song {
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
}

.gxs-icon.gxs-icon-listenCount {
  width: .45rem;
  height: .6rem;
}

.gxs-icon.gxs-icon-listenCount img {
  display: block;
}

.gxs-icon {
  display: block;
}

.recommended-song .listenCount {
  font-size: .5rem;
  color: #fff;
  line-height: 1.3em;
  margin-left: .4rem;
}

.recommendJt {
  position: absolute;
  top: 50%;
  right: .5rem;
  width: .6rem;
  height: 1.05rem;
  margin-top: -0.525rem;
}
</style>
