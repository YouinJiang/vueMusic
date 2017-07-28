<template>
  <div class="count">
    <div class="countHead">
      <em @click="back">
        <img src="../assets/images/icon-back.png" alt="">
      </em>
    </div>
    <div class="count-content">
      <div class="count-banner" v-if="countList.topinfo">
        <img :src="countList.topinfo.pic_h5" alt="">
        <div class="count-banner-tip">
          <div class="count-title">{{countList.topinfo.ListName}}</div>
          <div class="count-date">{{countList.date}}</div>
        </div>
      </div>
  
      <ul>
        <li class="count-box" v-for="(list,index) in countList.songlist" :key="index" @click="showAudio(index,list)">
          <div class="count-box-in">
            <div class="count-box-num">{{index+1}}</div>
            <div class="count-box-text">
              <p class="count-box-song">{{list.data.songname}}</p>
              <p class="count-box-sing">{{list.data.singer[0].name}}-{{list.data.albumname}}</p>
            </div>
            <div class="count-box-icon" @click.stop="showListMeng(index,list)">
              <!--<img src="../assets/images/icon-ellipses.png" alt="">-->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      countList: {}
    }
  },

  computed: {
    ...mapState(
      ['recommendId']
    )
  },

  beforeMount () {
    axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
      params: {
        topid: this.recommendId
      }
    })
      .then(e => {
        var data = e.request.response
        data = typeof data === 'string' ? JSON.parse(data) : data
        this.countList = data
        console.log(data)
      })
      .catch(function (response) {
        console.log('请联系管理员' + response)
      })
  },
  methods: {
    ...mapMutations([
      'setIsAudioBox', 'clickPlay'
    ]),
    showAudio (i, li) {
      let list = { 'id': li.data.songid, 'mid': li.data.songmid, 'name': li.data.songname, 'singer': li.data.singer[0].name, showNewSong: true }
      this.$store.commit('songInfo', list)
      this.$store.commit('setPlayList', list)
      this.clickPlay(true)
      this.setIsAudioBox(true)
    },
    back () {
      window.history.go(-1)
    },
    showListMeng (i, li) {
      let list = {'id': li.data.songid, 'mid': li.data.songmid, 'name': li.data.songname, 'singer': li.data.singer[0].name}
      this.$store.commit('listMengData', list)
      this.$store.commit('showListMeng', true)
    }
  }
}
</script>
<style>

</style>
