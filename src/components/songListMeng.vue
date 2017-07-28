<template>
  <div class="list-cover" @click="hideSongList">
      <div class="list-list">
        <div class="list-box">
          <p class="overflowText">{{list.name}}</p>
          <p class="overflowText">{{list.singer}}</p>
        </div>  
        <div class="list-box" @click.stop="delateListSong">从播放列表中删除</div>
      </div>
  </div>
</template>
<script>
  export default{
    name: 'songListMeng',
    props: {
      list: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      delateListSong () {
        if (this.list.id === this.$store.state.song.id) {
          alert('歌曲正在播放中，不能删除')
        } else {
          this.$store.commit('removePlayList', this.list.index)
          this.hideSongList()
        }
      },
      hideSongList () {
        this.$store.commit('showSongListMeng', false)
      }
    }
  }
</script>
<style scoped>
</style>
