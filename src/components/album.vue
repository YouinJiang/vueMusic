<template>
    <div class="singer-wrap">
        <div class="countHead">
            <em @click="back">
                <img src="../assets/images/icon-back.png" alt="">
            </em>
        </div>
        <div class="count-content">
            <div class="count-banner">
                <img :src="imgUrl" alt="">
                <div class="count-banner-tip">
                <div class="count-title">{{list.name}}</div>
                <div class="count-date">歌手：{{list.singername}}</div>
                <div class="count-date">发行公司：{{list.company}}</div>
                <div class="count-date">发行时间：{{list.aDate}}</div>
                </div>
            </div>
  
            <ul>
                <li class="count-box" v-for="(item,index) in list.list" :key="index" @click="showAudio(item)">
                    <div class="count-box-in">
                        <div class="count-box-num">{{index+1}}</div>
                        <div class="count-box-text">
                        <p class="count-box-song">{{item.songname}}</p>
                        <p class="count-box-sing">{{item.songname}}</p>
                        </div>
                        <div class="count-box-icon" @click.stop="showListMeng(item)">
                        </div>
                    </div>
                </li>
                <li class="count-box">
                  <div class="count-box-in">
                    <p class="count-box-info">{{list.desc}}</p>
                  </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
export default{
  data () {
    return {
      list: {},
      mid: ''
    }
  },
  computed: {
    imgUrl () {
      return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + this.mid + '.jpg?max_age=2592000'
    }
  },
  created () {
    axios.get('http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
      params: {
        albummid: this.$route.query.search
      }
    })
    .then(e => {
      console.log(e)
      this.mid = e.data.data.mid
      this.list = e.data.data
    })
    .catch(function (response) {
      console.log('请联系管理员' + response)
    })
  },
  methods: {
    ...mapMutations([
      'clickPlay', 'setIsAudioBox'
    ]),
    back () {
      this.$router.go(-1)
      this.$store.commit('setIsSearch', true)
    },
    showAudio (li) {
      console.log(li)
      let list = { 'id': li.songid, 'mid': li.songmid, 'name': li.songname, 'singer': this.list.singername, showNewSong: true }
      this.$store.commit('songInfo', list)
      this.$store.commit('setPlayList', list)
      this.clickPlay(true)
      this.setIsAudioBox(true)
    },
    showListMeng (li) {
      let list = {'id': li.songid, 'mid': li.songmid, 'name': li.songname, 'singer': this.list.singername}
      this.$store.commit('listMengData', list)
      this.$store.commit('showListMeng', true)
    }
  }
}
</script>
<style scoped>
.count-box-info{
  width: 100%;
  color: #fff;
  line-height: 1.5em;
  font-size: .8rem;
  text-align: center;
}
</style>
