<template>
  <div class="list-cover" @click="hideSongList">
      <div class="list-list">
        <div class="list-box">
          <p class="overflowText">{{listMengData.name}}</p>
          <p class="overflowText">{{listMengData.singer}}</p>
        </div>  
        <div class="list-box" @click.stop="addListSong">加入播放列表</div>
      </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name: 'listMeng',
    props: {
      list: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      ...mapState([
        'listMengData'
      ])
    },
    methods: {
      addListSong () {
        this.$store.commit('setPlayList', this.listMengData)
        this.hideSongList()
      },
      hideSongList () {
        this.$store.commit('showListMeng', false)
      }
    }
  }
</script>
<style scoped>
</style>
