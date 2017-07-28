<template>
  <div class="songList-warp">
    <div class="audioBox-head flex-box">
      <div class="audioBox-back" @click="hideSongList">
        <img src="../assets/images/icon-back.png" alt="">
      </div>
      <div class="audioBox-name flex-box1">播放列表</div>
    </div>
    <div class="songList-box">
      <ul>
        <li class="count-box" v-for="(list,index) in playList" :key="index">
          <div class="count-box-in">
            <div class="count-box-num">{{index+1}}</div>
            <div class="count-box-text" @click="showAudio(index,list)">
              <p class="count-box-song">{{list.name}}</p>
              <p class="count-box-sing">{{list.singer}}</p>
            </div>
            <div class="count-box-icon" @click="showMeng(list.name,list.singer,list.id,index)">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <song-list-meng v-if="showSongListMeng" :list="listData"></song-list-meng>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import songListMeng from './songListMeng'
export default {
  name: 'songList',
  data () {
    return {
      listData: {
        name: null,
        singer: null,
        id: null,
        index: null
      }
    }
  },
  computed: {
    ...mapState(['playList', 'showSongListMeng'])
  },
  created () {
    console.log(this.playList)
  },
  components: {
    songListMeng
  },
  methods: {
    hideSongList () {
      this.$store.commit('isShowSongList', false)
    },
    showAudio (i, li) {
      this.$store.commit('songInfo', { 'id': li.id, 'mid': li.mid, 'name': li.name, 'singer': li.singer, showNewSong: true })
      this.$store.commit('clickPlay', true)
      this.hideSongList()
    },
    showMeng (name, singer, id, index) {
      this.listData = {name: name, singer: singer, id: id, index: index}
      console.log(this.listData)
      this.$store.commit('showSongListMeng', true)
    }
  }
}
</script>
<style scoped>
.songList-box {
  position: absolute;
  top: 2.2rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
