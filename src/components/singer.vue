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
                <div class="count-title">{{list.singer_name}}</div>
                <div class="count-date">{{list.fans}}</div>
                </div>
            </div>
  
            <ul>
                <li class="count-box" v-for="(item,index) in list.list" :key="index" @click="showAudio(item.musicData)">
                    <div class="count-box-in">
                        <div class="count-box-num">{{index+1}}</div>
                        <div class="count-box-text">
                        <p class="count-box-song">{{item.musicData.songorig}}</p>
                        <p class="count-box-sing">{{item.musicData.songname}}</p>
                        </div>
                        <div class="count-box-icon" @click.stop="showListMeng(item.musicData)">
                        </div>
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
      singer_mid: ''
    }
  },
  computed: {
    imgUrl () {
      return 'http://y.gtimg.cn/music/photo_new/T001R300x300M000' + this.singer_mid + '.jpg?max_age=2592000'
    }
  },
  created () {
    axios.get('http://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
      params: {
        order: 'listen',
        begin: 0,
        num: 8,
        singermid: this.$route.query.search,
        notice: 0,
        needNewCode: 1,
        from: 'h5',
        _: new Date().getTime()
      }
    })
    .then(e => {
      console.log(e)
      this.singer_mid = e.data.data.singer_mid
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
      let list = { 'id': li.songid, 'mid': li.songmid, 'name': li.songname, 'singer': this.list.singer_name, showNewSong: true }
      this.$store.commit('songInfo', list)
      this.$store.commit('setPlayList', list)
      this.clickPlay(true)
      this.setIsAudioBox(true)
    },
    showListMeng (li) {
      let list = {'id': li.songid, 'mid': li.songmid, 'name': li.songname, 'singer': this.list.singer_name}
      this.$store.commit('listMengData', list)
      this.$store.commit('showListMeng', true)
    }
  }
}
</script>
<style>
</style>
