<template>
  <div id="app">
    <transition name="custom-classes-transition" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
      <router-view></router-view>
    </transition>
    <search v-if="isSearch"></search>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast" leave-active-class="animated slideOutDown">
      <audio-nav v-if="song.singer"></audio-nav>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast" leave-active-class="animated slideOutDown">
      <audio-box v-show="isAudioBox"></audio-box>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast" leave-active-class="animated slideOutDown">
      <song-list v-if="isShowSongList"></song-list>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp fast" leave-active-class="animated slideOutDown">
      <list-meng v-if="showListMeng"></list-meng>
    </transition>
  </div>
</template>

<script>
import search from './components/search'
import audioBox from './components/audioBox'
import audioNav from './components/audioNav'
import songList from './components/songList'
import listMeng from './components/listMeng'
import {mapState} from 'vuex'
export default {
  name: 'app',
  components: {
    search,
    audioNav,
    audioBox,
    songList,
    listMeng
  },
  computed: {
    ...mapState(
      ['isSearch', 'isAudioBox', 'isShowSongList', 'song', 'showListMeng']
    )
  },
  created () {
  }
}
</script>

<style>
  @import url("./assets/css/main.css"); 
</style>
